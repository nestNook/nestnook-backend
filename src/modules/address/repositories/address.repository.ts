import { AddressRepositoryInterface } from './address.repository.interface';
import { Address, CreateAddressDTO } from '../dtos';
import { prisma } from '../../../infra/database';

export class AddressRepository implements AddressRepositoryInterface {
  async createAddress(dto: CreateAddressDTO): Promise<Address> {
    const address = await prisma.address.create({ data: dto })
    return address;
  }
}
