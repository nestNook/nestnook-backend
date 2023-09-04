import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload<T> extends JwtPayload {
  payload: T;
}
