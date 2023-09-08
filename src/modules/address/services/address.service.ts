import { AddressRepositoryInterface } from '../repositories/address.repository.interface';
import { AddressServiceInterface } from './address.service.interface';
import { Address, CreateAddressDTO, UpdateAddressDTO } from '../dtos';
import validationUtils from '@utils/validation-utils';

export class AddressService implements AddressServiceInterface {
  constructor(private readonly addressRepository: AddressRepositoryInterface) {}

  async getAddressById(id: string, userId: string): Promise<Address> {
    const address = await this.addressRepository.getAddressById(id, userId);

    if (!address) {
      throw new Error('Address not found');
    }

    return address;
  }

  async getUserAddresses(userId: string): Promise<Address[]> {
    const addresses = await this.addressRepository.getUserAddresses(userId);
    return addresses;
  }

  async updateAddress(
    id: string,
    userId: string,
    dto: UpdateAddressDTO
  ): Promise<Address> {
    if (validationUtils.isObjectEmpty(dto)) {
      throw new Error('At least one field required to update');
    }

    const updatedAddress = await this.addressRepository.updateAddress(
      id,
      userId,
      dto
    );

    if (!updatedAddress) {
      throw new Error('Address not found');
    }

    return updatedAddress;
  }

  async deleteAddress(id: string, userId: string): Promise<Address> {
    const deletedAddress = await this.addressRepository.deleteAddress(id, {
      user_id: userId,
    });

    if (!deletedAddress) {
      throw new Error('Address not found');
    }

    return deletedAddress;
  }

  async deleteUserAddresses(userId: string): Promise<Address[]> {
    const deletedAddresses = await this.addressRepository.deleteAddresses({
      user_id: userId,
    });
    return deletedAddresses;
  }

  async deleteFabricatorAddresses(fabricatorId: string): Promise<Address[]> {
    const deletedAddresses = await this.addressRepository.deleteAddresses({
      fabricator_id: fabricatorId,
    });
    return deletedAddresses;
  }

  async createAddress(dto: CreateAddressDTO): Promise<Address> {
    const address = await this.addressRepository.createAddress(dto);
    return address;
  }
}
