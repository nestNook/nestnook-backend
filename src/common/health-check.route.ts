import { Request, Response, NextFunction } from 'express';

export function HealthCheckRoute(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  return res.status(200).json({
    status: 'OK',
    timestamps: new Date().toISOString(),
  });
}
