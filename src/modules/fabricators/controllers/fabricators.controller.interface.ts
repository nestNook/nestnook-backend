import { Request, Response, NextFunction } from 'express';

export interface FabricatorsControllerInterface {
  createFabricator(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void>;
}
