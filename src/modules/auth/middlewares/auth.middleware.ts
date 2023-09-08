import sessionModule from '@modules/session/session.module';
import { Request, Response, NextFunction } from 'express';
import { SessionStatus } from '@@types/session-status';
import usersModule from '@modules/users/users.module';
import { Session } from '@modules/session/dtos';
import tokenUtils from '@utils/token-utils';
import cookieUtils from '@utils/cookie-utils';

export function auth() {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken =
        req.cookies.access_token || req.headers.authorization?.split(' ')[0];
      const refreshToken =
        req.cookies.refresh_token || req.headers['Refresh-Token'];

      if (!accessToken || !refreshToken) {
        return next(new Error('Token is missing'));
      }
      const isValidAccessToken = tokenUtils.verifyToken<{ user_id: string }>(
        accessToken
      );
      const isValidRefreshToken = tokenUtils.verifyToken<{
        session_id: string;
      }>(refreshToken);

      if (!isValidRefreshToken) {
        return next(new Error('Invalid or expired token'));
      }

      const session: Session = await sessionModule.service.findSessionById(
        isValidRefreshToken.session_id
      );

      if (isValidAccessToken && session.status === SessionStatus.ACTIVE) {
        const user = await usersModule.service.getUserById(
          isValidAccessToken.user_id
        );

        if (!user) {
          return next(new Error('Invalid or expired token'));
        }

        req.app.locals.user = user;
        return next();
      }

      if (!(refreshToken === session.refresh_token)) {
        return next(new Error('Invalid or expired token'));
      }

      const user = await usersModule.service.getUserById(session.user_id);

      if (!user) {
        return next(new Error('Invalid or expired token'));
      }

      req.app.locals.user = user;

      const newAccessToken = tokenUtils.accessToken({ user_id: user.id });
      const newRefreshToken = tokenUtils.refreshToken(user.id);

      await sessionModule.service.updateSession(session.id, {
        refresh_token: newRefreshToken,
        status: SessionStatus.ACTIVE,
      });

      cookieUtils.accessToken(newAccessToken, res);
      cookieUtils.refreshToken(newRefreshToken, res);

      return next();
    } catch (error) {
      return next(new Error('Invalid or expired token'));
    }
  };
}
