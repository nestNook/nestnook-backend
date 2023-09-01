import { AddressRepositoryInterface } from '../../../../../src/modules/address/repositories/address.repository.interface'

export class AddressRepositoryMock implements AddressRepositoryInterface {
  createAddress = jest.fn();
}