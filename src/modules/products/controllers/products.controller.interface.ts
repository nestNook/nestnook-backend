import { Request, Response, NextFunction } from 'express';

export interface ProductsControllerInterface {
  createProduct(req: Request, res: Response, next: NextFunction): Promise<any>;
}
