import { AddressControllerInterface } from './address.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { AddressServiceInterface } from '../services/address.service.interface';
import { Controller } from '../../../common/controller.decorator';

@Controller
export class AddressController implements AddressControllerInterface {
  constructor(private readonly addressService: AddressServiceInterface) {}

  async createAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const address = await this.addressService.createAddress(req.body);

    return res.status(201).json({
      status: 'success',
      data: address,
    });
  }
}
