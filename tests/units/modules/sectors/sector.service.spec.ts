import { SectorControllerInterface } from '@modules/sectors/controllers/sector.controller.interface';
import { SectorRepositoryInterface } from '@modules/sectors/repositories/sector.repository.interface';
import { SectorServiceInterface } from '@modules/sectors/services/sector.service.interface';
import { SectorController } from '@modules/sectors/controllers/sector.controller';
import { SectorService } from '@modules/sectors/services/sector.service';
import { SectorRepositoryMock } from './mocks/sector-mock.repository';
import { createSectorMock, sectorMock } from './mocks/sector-mock';

const prismaMock = jest.fn().mockImplementation(() => ({
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  sector: {
    create: jest.fn(),
  },
}));

jest.mock('@prisma/client', () => ({
  __esModule: true,
  PrismaClient: () => prismaMock,
}));

describe('Sector service', () => {
  let sectorController: SectorControllerInterface;
  let sectorService: SectorServiceInterface;
  let sectorRepository: SectorRepositoryInterface;

  beforeEach(() => {
    sectorRepository = new SectorRepositoryMock();
    sectorService = new SectorService(sectorRepository);
    sectorController = new SectorController(sectorService);
  });

  describe('Create sector', () => {
    it('should be able to create a sector', async () => {
      const repositorySpy = jest
        .spyOn(sectorRepository, 'createSector')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      const sector = await sectorService.createSector(createSectorMock);
      expect(repositorySpy).toHaveBeenCalledWith(createSectorMock);
      expect(sector).toEqual(sectorMock);
    });

    it('should not be able to create a sector with already existent name', async () => {
      const findSectorByNameSpy = jest
        .spyOn(sectorRepository, 'findSectorByName')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      const createSectorSpy = jest.spyOn(sectorRepository, 'createSector');

      await expect(async () => {
        await sectorService.createSector(createSectorMock);
      }).rejects.toThrow();
      expect(findSectorByNameSpy).toHaveBeenCalledWith(createSectorMock.name);
      expect(createSectorSpy).not.toHaveBeenCalled();
    });
  });
});
