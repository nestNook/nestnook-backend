import { AddressRepositoryInterface } from '@modules/address/repositories/address.repository.interface';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { addressMock, createAddressMock } from './mocks/address-mock';
import { mockPrisma } from '@test/__mocks__/prisma-mock';

describe('Address Repository', () => {
  let addressRepository: AddressRepositoryInterface;

  beforeEach(() => {
    addressRepository = new AddressRepository();
  });

  describe('Create address', () => {
    it('should be able to create an address', async () => {
      const createAddressPrismaMock =
        mockPrisma.address.create.mockReturnValueOnce(
          Promise.resolve(addressMock)
        );

      const address = await addressRepository.createAddress(createAddressMock);

      expect(createAddressPrismaMock).toHaveBeenCalledWith({
        data: createAddressMock,
      });
      expect(address).toEqual(addressMock);
    });
  });
});
