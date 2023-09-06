import { Request, Response } from 'express';

export interface FabricatorsControllerInterface {
  createFabricator(
    req: Request,
    res: Response,
  ): Promise<Response>;

  find(
    req: Request,
    res: Response,
  ): Promise<Response>;

  findById(
    req: Request,
    res: Response,
  ): Promise<Response>;

  updateFabricator(
    req: Request,
    res: Response,
  ): Promise<Response>;

  deleteFabricator(
    req: Request,
    res: Response,
  ): Promise<Response>
}
