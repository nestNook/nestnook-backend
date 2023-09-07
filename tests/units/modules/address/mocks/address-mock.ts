import { Address, CreateAddressDTO } from '@modules/address/dtos';
import { randomUUID } from 'crypto';

export const createAddressMock: CreateAddressDTO = {
  user_id: '1',
  postal_code: '13213-190',
  country: 'Brasil',
  street: 'mimosa',
  state: 'rio de janeiro',
  city: 'rio de janeiro',
  neighborhood: 'vila mimosa',
};

export const addressMock: Address = {
  id: randomUUID(),
  user_id: '1',
  postal_code: '13213-190',
  country: 'Brasil',
  street: 'mimosa',
  state: 'rio de janeiro',
  city: 'rio de janeiro',
  neighborhood: 'vila mimosa',
  created_at: new Date(),
  updated_at: new Date(),
};
