import { type TokenPayload } from '@@types/token-payload';
import config from '@config/index';

import jwt from 'jsonwebtoken';

export class TokenUtils {
  accessToken<T extends Record<string, any>>(payload: T): string {
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    return token;
  }

  verifyToken<T>(token: string): TokenPayload<T> | null {
    try {
      const payload: TokenPayload<T> = jwt.verify(
        token,
        config.jwtSecret,
      ) as TokenPayload<T>;
      return payload;
    } catch (e) {
      return null;
    }
  }

  refreshToken(sessionId: string): string {
    const token = jwt.sign({ session_id: sessionId }, config.jwtSecret, {
      expiresIn: config.refreshTokenExpiresIn,
    });

    return token;
  }
}

export default new TokenUtils();
