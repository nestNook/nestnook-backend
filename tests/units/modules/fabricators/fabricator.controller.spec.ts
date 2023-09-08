import { FabricatorRepository } from '@modules/fabricators/repositories/fabricators.repository';
import { createFabricatorMock, fabricatorMock } from './mocks/fabricator-mock';
import Server from '@infra/server';
import request from 'supertest';

describe('Fabricator controller', () => {
  const app = Server.app;

  beforeAll(() => {
    Server.start();
  });

  afterAll(() => {
    Server.stop();
  });

  describe('Create fabricator', () => {
    it('should be able to create a fabricator', async () => {
      const createFabricatorSpy = jest
        .spyOn(FabricatorRepository.prototype, 'createFabricator')
        .mockReturnValueOnce(Promise.resolve(fabricatorMock));

      const response = await request(app)
        .post('/fabricators')
        .send(createFabricatorMock);

      expect(createFabricatorSpy).toHaveBeenCalledWith(createFabricatorMock);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.status).toEqual('success');
      expect(response.body.data).toHaveProperty('id');
    });
  });
});
