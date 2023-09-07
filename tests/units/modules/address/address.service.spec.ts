import { AddressServiceInterface } from '@modules/address/services/address.service.interface';
import { AddressService } from '@modules/address/services/address.service';
import { AddressRepositoryMock } from './mocks/address-mock.repository';
import { addressMock, createAddressMock } from './mocks/address-mock';

describe('Address service', () => {
  let addressService: AddressServiceInterface;
  let addressRepository: AddressRepositoryMock;

  beforeEach(() => {
    addressRepository = new AddressRepositoryMock();
    addressService = new AddressService(addressRepository);
  });

  it('should be able to create an address', async () => {
    const repositorySpy = jest
      .spyOn(addressRepository, 'createAddress')
      .mockReturnValueOnce(Promise.resolve(addressMock));

    const address = await addressService.createAddress(createAddressMock);
    expect(repositorySpy).toHaveBeenCalledWith(createAddressMock);
    expect(address).toEqual(addressMock);
  });
});
