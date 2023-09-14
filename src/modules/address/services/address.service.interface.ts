import {
  type CreateAddressDTO,
  type Address,
  type UpdateAddressDTO,
} from '../dtos';

export interface AddressServiceInterface {
  createAddress: (dto: CreateAddressDTO) => Promise<Address>;
  getAddressById: (id: string, userId: string) => Promise<Address>;
  getUserAddresses: (userId: string) => Promise<Address[]>;
  updateAddress: (
    id: string,
    userId: string,
    dto: UpdateAddressDTO,
  ) => Promise<Address>;
  deleteAddress: (id: string, userId: string) => Promise<Address>;
  deleteUserAddresses: (userId: string) => Promise<Address[]>;
  deleteFabricatorAddresses: (userId: string) => Promise<Address[]>;
}
