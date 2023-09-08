import { JwtPayload } from 'jsonwebtoken';

export type TokenPayload<T> = JwtPayload & T;
