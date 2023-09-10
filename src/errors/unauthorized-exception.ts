import { AppError } from './app-error';

export class UnauthorizedException extends AppError {
  constructor(message: string) {
    super(401, message);
  }
}
