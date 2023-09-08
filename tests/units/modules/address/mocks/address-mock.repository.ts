import { AddressRepositoryInterface } from '@modules/address/repositories/address.repository.interface';

export class AddressRepositoryMock implements AddressRepositoryInterface {
  getAddressById = jest.fn();
  getUserAddresses = jest.fn();
  updateAddress = jest.fn();
  deleteAddress = jest.fn();
  deleteAddresses = jest.fn();
  createAddress = jest.fn();
}
