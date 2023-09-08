import {
  Address,
  CreateAddressDTO,
  DeleteAddressQuery,
  UpdateAddressDTO,
} from '../dtos';

export interface AddressRepositoryInterface {
  createAddress(dto: CreateAddressDTO): Promise<Address>;
  getAddressById(userId: string, id: string): Promise<Address | null>;
  getUserAddresses(userId: string): Promise<Address[]>;
  updateAddress(
    id: string,
    userId: string,
    dto: UpdateAddressDTO
  ): Promise<Address | null>;
  deleteAddress(id: string, query: DeleteAddressQuery): Promise<Address | null>;
  deleteAddresses(query: DeleteAddressQuery): Promise<Address[]>;
}
