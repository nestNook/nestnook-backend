export class ValidationUtils {
  isObjectEmpty(object: Record<string, any>) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        return false;
      }
    }
    return true;
  }
}

export default new ValidationUtils();
