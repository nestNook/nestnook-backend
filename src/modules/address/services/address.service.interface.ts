import { CreateAddressDTO, Address } from "../dtos";

export interface AddressServiceInterface { 
  createAddress(dto: CreateAddressDTO): Promise<Address>
 }
