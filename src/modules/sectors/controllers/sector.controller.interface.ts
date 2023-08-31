import { Request, Response, NextFunction } from 'express';

export interface SectorControllerInterface {
  createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>;
}
