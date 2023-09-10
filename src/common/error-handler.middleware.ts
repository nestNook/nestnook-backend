import { AppError } from '@src/errors/app-error';
import { Request, Response, NextFunction } from 'express';

export function errorHandler() {
  return function (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
        path: req.baseUrl,
      });
    }

    return res.status(500).json({
      message: 'Internal server error',
      timestamps: new Date().toISOString(),
    });
  };
}
