import { Address, CreateAddressDTO } from '../dtos';

export interface AddressRepositoryInterface {
  createAddress(dto: CreateAddressDTO): Promise<Address>;
}
