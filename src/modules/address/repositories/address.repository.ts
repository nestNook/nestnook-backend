import { AddressRepositoryInterface } from './address.repository.interface';
import {
  Address,
  CreateAddressDTO,
  DeleteAddressQuery,
  UpdateAddressDTO,
} from '../dtos';
import { prisma } from '@infra/database';

export class AddressRepository implements AddressRepositoryInterface {
  async getAddressById(id: string): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: {
        id,
      },
    });

    return address;
  }

  async getUserAddresses(userId: string): Promise<Address[]> {
    const addresses = await prisma.address.findMany({
      where: {
        user_id: userId,
      },
    });

    return addresses;
  }

  async updateAddress(
    id: string,
    userId: string,
    dto: UpdateAddressDTO
  ): Promise<Address | null> {
    const updatedAddress = await prisma.address.update({
      where: {
        id,
        user_id: userId,
      },
      data: dto,
    });

    return updatedAddress;
  }

  async deleteAddress(
    id: string,
    query: DeleteAddressQuery
  ): Promise<Address | null> {
    const deletedAddress = await prisma.address.delete({
      where: {
        id,
        ...query,
      },
    });

    return deletedAddress;
  }

  async deleteAddresses(query: DeleteAddressQuery): Promise<Address[]> {
    const deletedAddresses = await prisma.address.findMany({
      where: query,
    });

    await prisma.address.deleteMany({
      where: query,
    });

    return deletedAddresses;
  }

  async createAddress(dto: CreateAddressDTO): Promise<Address> {
    const address = await prisma.address.create({ data: dto });
    return address;
  }
}
