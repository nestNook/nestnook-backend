import { Request, Response, NextFunction } from 'express';

export interface FabricatorsControllerInterface {
  createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
