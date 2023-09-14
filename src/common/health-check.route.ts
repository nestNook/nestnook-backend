import { type Request, type Response, type NextFunction } from 'express';

export function HealthCheckRoute(
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  return res.status(200).json({
    status: 'OK',
    timestamps: new Date().toISOString(),
  });
}
