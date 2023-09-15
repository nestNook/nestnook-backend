import { type Request, type Response, type NextFunction } from 'express';

export function NotFoundRoute(
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  return res.status(404).json({
    status: 'fail',
    message: 'Route not found',
    path: req.url,
    timestamps: new Date().toISOString(),
  });
}
