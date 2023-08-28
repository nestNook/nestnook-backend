import { Request, Response, NextFunction } from 'express';

export function Controller(target: any) {
  const methods = Object.getOwnPropertyNames(target.prototype);
  for (const method of methods) {
    const descriptor = Object.getOwnPropertyDescriptor(
      target.prototype,
      method
    );

    if (descriptor && typeof descriptor.value === 'function') {
      const originalMethod = descriptor.value;
      const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: descriptor.enumerable,
        get() {
          const boundFn = originalMethod.bind(this);
          return async (req: Request, res: Response, next: NextFunction) => {
            await boundFn(req, res, next).catch(next);
          };
        },
      };
      Object.defineProperty(target.prototype, method, newDescriptor);
    }
  }
}
