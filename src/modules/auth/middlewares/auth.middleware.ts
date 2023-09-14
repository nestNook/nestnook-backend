import { UnauthorizedException } from '@src/errors/unauthorized-exception';
import { ForbiddenException } from '@src/errors/forbidden-exception';
import { type Request, type Response, type NextFunction } from 'express';
import { SessionStatus } from '@@types/session-status';
import { type Session } from '@modules/session/dtos';
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
        next(new UnauthorizedException('Token is missing'));
        return;
      }

      const isValidAccessToken = tokenUtils.verifyToken<{ user_id: string }>(
        accessToken,
      );

      const isValidRefreshToken = tokenUtils.verifyToken<{
        session_id: string;
      }>(refreshToken);

      if (!isValidRefreshToken) {
        next(new UnauthorizedException('Invalid or expired token'));
        return;
      }

      const session: Session = await authModule.service.findSessionById(
        isValidRefreshToken.session_id,
      );

      if (isValidAccessToken && session.status === SessionStatus.ACTIVE) {
        const user = await authModule.service.getUserById(
          isValidAccessToken.user_id,
        );

        if (!user) {
          next(new UnauthorizedException('Invalid or expired token'));
          return;
        }

        if (user.role.name !== role) {
          next(
            new ForbiddenException(
              'You are not allowed to perform this action',
            ),
          );
          return;
        }

        req.app.locals.user = user;
        next();
        return;
      }

      if (!(refreshToken === session.refresh_token)) {
        next(new UnauthorizedException('Invalid or expired token'));
        return;
      }

      const user = await authModule.service.getUserById(session.user_id);

      if (!user) {
        next(new UnauthorizedException('Invalid or expired token'));
        return;
      }

      if (user.role.name !== role) {
        next(
          new ForbiddenException('You are not allowed to perform this action'),
        );
        return;
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

      next();
    } catch (error) {
      next(new UnauthorizedException('Invalid or expired token'));
    }
  };
}
