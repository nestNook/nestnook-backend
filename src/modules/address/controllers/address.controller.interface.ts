import { Request, Response, NextFunction } from 'express';

export interface AddressControllerInterface {
  createAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response>
}
