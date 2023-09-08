import { AddressRepository } from '@modules/address/repositories/address.repository';
import { addressMock, createAddressMock } from './mocks/address-mock';
import Server from '@infra/server';
import request from 'supertest';

describe('Address controller', () => {
  const app = Server.app;

  beforeAll(() => {
    Server.start();
  });

  afterAll(() => {
    Server.stop();
  });

  describe('Create address', () => {
    it('should be able to create an address', async () => {
      const createAddressSpy = jest
        .spyOn(AddressRepository.prototype, 'createAddress')
        .mockReturnValueOnce(Promise.resolve(addressMock));

      const response = await request(app)
        .post('/address')
        .send(createAddressMock);

      expect(createAddressSpy).toHaveBeenCalledWith(createAddressMock);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.status).toEqual('success');
      expect(response.body.data).toHaveProperty('id');
    });
  });
});
