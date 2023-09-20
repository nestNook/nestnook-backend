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
          Promise.resolve(sectorMock),
        );
      const sector = await sectorRepository.createSector(createSectorMock);

      expect(createSectorPrismaMock).toHaveBeenCalledWith({
        data: createSectorMock,
      });
      expect(sector).toEqual(sectorMock);
    });
  });

  describe('Find sector by name', () => {
    it('should return a sector after senting a name', async () => {
      const findByNamePrismaMock =
        mockPrisma.sector.findFirst.mockReturnValueOnce(
          Promise.resolve(sectorMock),
        );

      const sector = await sectorRepository.findByName(sectorMock.name);

      expect(findByNamePrismaMock).toHaveBeenCalledWith({
        where: { name: sectorMock.name },
      });

      expect(sector).toEqual(sectorMock);
    });
  });

  describe('Find sector by id', () => {
    it('should return a sector after sending an id', async () => {
      const findByIdPrismaMock =
        mockPrisma.sector.findFirst.mockReturnValueOnce(
          Promise.resolve(sectorMock),
        );

      const sector = await sectorRepository.findById(sectorMock.id);

      expect(findByIdPrismaMock).toHaveBeenCalledWith({
        where: { id: sectorMock.id },
      });

      expect(sector).toEqual(sectorMock);
    });
  });

  describe('Update sector', () => {
    it('should be able to update a sector', async () => {
      const updateSectorPrismaMock =
        mockPrisma.sector.update.mockReturnValueOnce(
          Promise.resolve(sectorMock),
        );

      const sector = await sectorRepository.updateSector(
        sectorMock.id,
        sectorMock,
      );

      expect(updateSectorPrismaMock).toHaveBeenCalledWith({
        data: sectorMock,
        where: { id: sectorMock.id },
      });

      expect(sector).toEqual(sectorMock);
    });
  });

  describe('Delete sector', () => {
    it('should be able to delete a fabricator', async () => {
      const deleteSectorPrismaMock =
        mockPrisma.sector.delete.mockReturnValueOnce(
          Promise.resolve(sectorMock),
        );

      const sector = await sectorRepository.deleteSector(sectorMock.id);
      expect(deleteSectorPrismaMock).toHaveBeenCalledWith({
        where: { id: sectorMock.id },
      });
      expect(sector).toEqual(sectorMock);
    });
  });
});
