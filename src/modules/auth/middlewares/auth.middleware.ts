import { UnauthorizedException } from '@src/errors/unauthorized-exception';
import { ForbiddenException } from '@src/errors/forbidden-exception';
import { Request, Response, NextFunction } from 'express';
import { SessionStatus } from '@@types/session-status';
import { Session } from '@modules/session/dtos';
import { UserRoles } from '@@types/user-roles';
import cookieUtils from '@utils/cookie-utils';
import tokenUtils from '@utils/token-utils';
import authModule from '../auth.module';

export function auth(role: UserRoles = UserRoles.CUSTOMER) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken =
        req.cookies.access_token || req.headers.authorization?.split(' ')[1];
      const refreshToken =
        req.cookies.refresh_token || req.get('Refresh-Token');

      if (!accessToken || !refreshToken) {
        return next(new UnauthorizedException('Token is missing'));
      }

      const isValidAccessToken = tokenUtils.verifyToken<{ user_id: string }>(
        accessToken
      );

      const isValidRefreshToken = tokenUtils.verifyToken<{
        session_id: string;
      }>(refreshToken);

      if (!isValidRefreshToken) {
        return next(new UnauthorizedException('Invalid or expired token'));
      }

      const session: Session = await authModule.service.findSessionById(
        isValidRefreshToken.session_id
      );

      if (isValidAccessToken && session.status === SessionStatus.ACTIVE) {
        const user = await authModule.service.getUserById(
          isValidAccessToken.user_id
        );

        if (!user) {
          return next(new UnauthorizedException('Invalid or expired token'));
        }
        console.log(user.role.name, role);
        if (user.role.name != role) {
          return next(
            new ForbiddenException('You are not allowed to perform this action')
          );
        }

        req.app.locals.user = user;
        return next();
      }

      if (!(refreshToken === session.refresh_token)) {
        return next(new UnauthorizedException('Invalid or expired token'));
      }

      const user = await authModule.service.getUserById(session.user_id);

      if (!user) {
        return next(new UnauthorizedException('Invalid or expired token'));
      }

      if (user.role.name != role) {
        return next(
          new ForbiddenException('You are not allowed to perform this action')
        );
      }

      req.app.locals.user = user;

      const newAccessToken = tokenUtils.accessToken({ user_id: user.id });
      const newRefreshToken = tokenUtils.refreshToken(user.id);

      await authModule.service.updateSession(session.id, {
        refresh_token: newRefreshToken,
        status: SessionStatus.ACTIVE,
      });

      cookieUtils.accessToken(newAccessToken, res);
      cookieUtils.refreshToken(newRefreshToken, res);

      return next();
    } catch (error) {
      return next(new UnauthorizedException('Invalid or expired token'));
    }
  };
}
