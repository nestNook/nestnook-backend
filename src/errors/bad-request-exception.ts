import { AppError } from './app-error';

export class BadRequestException extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}
