import { Address, CreateAddressDTO } from '@modules/address/dtos';
import { randomUUID } from 'crypto';
import { userMock } from '../../users/mocks/users-mock';

export const createAddressMock: CreateAddressDTO = {
  user_id: userMock.id,
  fabricator_id: null,
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
  fabricator_id: null,
  postal_code: '13213-190',
  country: 'Brasil',
  street: 'mimosa',
  state: 'rio de janeiro',
  city: 'rio de janeiro',
  neighborhood: 'vila mimosa',
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockCreateAddressResponse = () => {
  const res = {
    status: jest.mock,
    json: jest.mock,
  };
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
