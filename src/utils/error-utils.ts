import { type ZodIssue } from 'zod';

export class ErrorUtils {
  static parseZodError(errors: ZodIssue[]): string {
    return errors.map((err) => err.message).join(', ');
  }
}
