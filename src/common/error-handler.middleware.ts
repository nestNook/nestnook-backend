import { AppError } from '@src/errors/app-error';
import { type Request, type Response, type NextFunction } from 'express';

export function errorHandler() {
  return function (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      timestamps: new Date().toISOString(),
      path: req.url,
    });
  };
}
