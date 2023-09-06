import { SectorRepositoryInterface } from '@modules/sectors/repositories/sector.repository.interface';
import { SectorRepository } from '@modules/sectors/repositories/sector.repository';
import { createSectorMock, sectorMock } from './mocks/sector-mock';
import { mockPrisma } from '@test/__mocks__/prisma-mock';

describe('Sector Repository', () => {
  let sectorRepository: SectorRepositoryInterface;

  beforeEach(() => {
    sectorRepository = new SectorRepository();
  });

  describe('Create sector', () => {
    it('should de able to create a sector', async () => {
      const createSectorPrismaMock =
        mockPrisma.sector.create.mockReturnValueOnce(
          Promise.resolve(sectorMock)
        );

      mockPrisma.sector.findFirst.mockReturnValueOnce(Promise.resolve(null));

      const sector = await sectorRepository.createSector(createSectorMock);

      expect(createSectorPrismaMock).toHaveBeenCalledWith({
        data: createSectorMock,
      });
      expect(sector).toEqual(sectorMock);
    });
  });
});
