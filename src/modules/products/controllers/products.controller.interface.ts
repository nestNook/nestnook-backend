import { type Request, type Response, type NextFunction } from 'express';

export interface ProductsControllerInterface {
  createProduct: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response>;
}
