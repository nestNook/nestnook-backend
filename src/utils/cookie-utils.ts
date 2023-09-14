import config from '@config/index';
import { type CookieOptions, type Response } from 'express';

export class CookieUtils {
  accessToken(token: string, res: Response): void {
    const expiresIn = config.sessionCookieExpiresIn;
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const maxAge = Date.now() + expiresIn * ONE_DAY;

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      maxAge,
    };

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true;
    }

    res.cookie('access_token', token, cookieOptions);
  }

  refreshToken(token: string, res: Response): void {
    const expiresIn = config.refreshTokenCookieExpiresIn;
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const maxAge = Date.now() + expiresIn * ONE_DAY;

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      maxAge,
    };

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true;
    }

    res.cookie('refresh_token', token, cookieOptions);
  }
}

export default new CookieUtils();
