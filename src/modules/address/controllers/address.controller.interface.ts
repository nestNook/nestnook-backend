import { Request, Response, NextFunction } from 'express';

export interface AddressControllerInterface {
  createAddress(req: Request, res: Response): Promise<Response>;
  getAddressById(req: Request, res: Response): Promise<Response>;
  getUserAddresses(req: Request, res: Response): Promise<Response>;
  updateAddress(req: Request, res: Response): Promise<Response>;
  deleteAddress(req: Request, res: Response): Promise<Response>;
}
