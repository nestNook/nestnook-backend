import { BadRequestException } from '@src/errors/bad-request-exception';
import { ErrorUtils } from './error-utils';
import { Schema } from 'zod';
export class ValidationUtils {
  isObjectEmpty(object: Record<string, any>) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        return false;
      }
    }
    return true;
  }

  validate<T>(schema: Schema, object: T) {
    const result = schema.safeParse(object);

    if (!result.success) {
      throw new BadRequestException(
        ErrorUtils.parseZodError(result.error.errors)
      );
    }
  }
}

export default new ValidationUtils();
