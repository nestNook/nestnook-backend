import { type AddressServiceInterface } from '../services/address.service.interface';
import { type AddressControllerInterface } from './address.controller.interface';
import {
  type Address,
  type CreateAddressDTO,
  type UpdateAddressDTO,
} from '../dtos';
import { Controller } from '@common/controller.decorator';
import { type Request, type Response } from 'express';

@Controller
export class AddressController implements AddressControllerInterface {
  constructor(private readonly addressService: AddressServiceInterface) {}

  async createAddress(req: Request, res: Response): Promise<Response> {
    const createAddressDto: CreateAddressDTO = req.body;
    const { id } = req.app.locals.user;
    createAddressDto.user_id = id;
    const address = await this.addressService.createAddress(createAddressDto);

    return res.status(201).json({
      status: 'success',
      data: address,
    });
  }

  async getAddressById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId: string = req.app.locals.user.id;
    const address: Address = await this.addressService.getAddressById(
      id,
      userId,
    );

    return res.status(200).json({
      status: 'success',
      data: address,
    });
  }

  async getUserAddresses(req: Request, res: Response): Promise<Response> {
    const userId: string = req.app.locals.user.id;
    const addresses: Address[] =
      await this.addressService.getUserAddresses(userId);

    return res.status(200).json({
      status: 'success',
      results: addresses.length,
      data: addresses,
    });
  }

  async updateAddress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const dto: UpdateAddressDTO = req.body;
    const userId: string = req.app.locals.user.id;

    const address: Address = await this.addressService.updateAddress(
      id,
      userId,
      dto,
    );

    return res.status(200).json({
      status: 'success',
      data: address,
    });
  }

  async deleteAddress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const userId: string = req.app.locals.user.id;

    const address: Address = await this.addressService.deleteAddress(
      id,
      userId,
    );

    return res.status(200).json({
      status: 'success',
      data: address,
    });
  }
}
