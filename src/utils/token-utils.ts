import { TokenPayload } from '@@types/token-payload';
import config from '@config/index';

import jwt from 'jsonwebtoken';

export class TokenUtils {
  accessToken(id: string): string {
    const token = jwt.sign({ id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    return token;
  }

  verifyToken<T>(token: string): TokenPayload<T> | null {
    try {
      const payload: TokenPayload<T> = jwt.verify(
        token,
        config.jwtSecret
      ) as TokenPayload<T>;
      return payload;
    } catch (e) {
      return null;
    }
  }

  refreshToken(id: string): string {
    const token = jwt.sign({ id }, config.jwtSecret, {
      expiresIn: config.refreshTokenExpiresIn,
    });

    return token;
  }
}

export default new TokenUtils();