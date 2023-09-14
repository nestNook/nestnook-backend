import {
  type Request,
  type Response,
  type NextFunction,
  type Router,
} from 'express';

export type Handler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<any>;

export interface Route {
  path: string;
  handler: Handler | Router;
  method: keyof Router;
  middlewares?: Handler[];
}
