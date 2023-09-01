import { AddressControllerInterface } from './address.controller.interface';
import { Request, Response, NextFunction } from 'express';
import { AddressServiceInterface } from '../services/address.service.interface';
import { Controller } from '../../../common/controller.decorator';
import { CreateAddressDTO } from '../dtos';

@Controller
export class AddressController implements AddressControllerInterface {
  constructor(private readonly addressService: AddressServiceInterface) {}

  async createAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const createAddressDto: CreateAddressDTO = req.body
    const address = await this.addressService.createAddress(createAddressDto);

    return res.status(201).json({
      status: 'success',
      data: address,
    });
  }
}
