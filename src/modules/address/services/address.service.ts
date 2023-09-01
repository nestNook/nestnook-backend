import { AddressServiceInterface } from './address.service.interface';
import { Address, CreateAddressDTO } from '../dtos';
import { AddressRepositoryInterface } from '../repositories/address.repository.interface';

export class AddressService implements AddressServiceInterface {
  constructor(private readonly addressRepository: AddressRepositoryInterface) {}

  async createAddress(dto: CreateAddressDTO): Promise<Address> {
      const address = await this.addressRepository.createAddress(dto)
      return address;
  }
}
