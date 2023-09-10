import { AppError } from './app-error';

export class ForbiddenException extends AppError {
  constructor(message: string) {
    super(403, message);
  }
}
