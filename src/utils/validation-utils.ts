import { BadRequestException } from '@src/errors/bad-request-exception';
import { ErrorUtils } from './error-utils';
import { type Schema } from 'zod';
export class ValidationUtils {
  isObjectEmpty(object: Record<string, any>): boolean {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        return false;
      }
    }
    return true;
  }

  validate<T>(schema: Schema, object: T): T {
    const result = schema.safeParse(object);

    if (!result.success) {
      throw new BadRequestException(
        ErrorUtils.parseZodError(result.error.errors),
      );
    }

    return result.data;
  }
}

export default new ValidationUtils();
