import { ZodIssue } from 'zod';

export class ErrorUtils {
  static parseZodError(errors: ZodIssue[]) {
    return errors.map((err) => err.message).join(', ');
  }
}
