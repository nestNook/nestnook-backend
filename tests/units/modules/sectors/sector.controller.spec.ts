import { SectorRepository } from '@modules/sectors/repositories/sector.repository';
import { createSectorMock, sectorMock } from './mocks/sector-mock';
import Server from '@infra/server';
import request from 'supertest';

describe('Sector controller', () => {
  const app = Server.app;

  beforeAll(() => {
    Server.start();
  });

  afterAll(() => {
    Server.stop();
  });

  describe('Create sector', () => {
    it('should be able to create a sector', async () => {
      const createSectorSpy = jest
        .spyOn(SectorRepository.prototype, 'createSector')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      jest
        .spyOn(SectorRepository.prototype, 'findSectorByName')
        .mockReturnValueOnce(Promise.resolve(null));

      const response = await request(app)
        .post('/sectors')
        .send(createSectorMock);

      expect(createSectorSpy).toHaveBeenCalledWith(createSectorMock);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('data');
      expect(response.body.status).toEqual('success');
      expect(response.body.data).toHaveProperty('id');
    });
  });
});
