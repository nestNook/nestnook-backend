export class ValidationUtils {
  isObjectEmpty(object: Record<string, any>): boolean {
    let isEmpty = true;

    for (const [v] of Object.values(object)) {
      isEmpty =
        isEmpty && (typeof v !== 'object' ? !!v : this.isObjectEmpty(v));
    }

    return isEmpty;
  }
}

export default new ValidationUtils();
