import { SectorRepositoryInterface } from '@modules/sectors/repositories/sector.repository.interface';
import { SectorServiceInterface } from '@modules/sectors/services/sector.service.interface';
import { SectorService } from '@modules/sectors/services/sector.service';
import { SectorRepositoryMock } from './mocks/sector-mock.repository';
import { createSectorMock, sectorMock } from './mocks/sector-mock';
import { BadRequestException } from '@src/errors/bad-request-exception';
import validationUtils from '@utils/validation-utils';
import { NotFoundException } from '@src/errors/not-found-exception';
import { UpdateSectorDTO } from '@modules/sectors/dtos/update-sector.dto';
import { CreateSectorDTO } from '@modules/sectors/dtos';

describe('Sector service', () => {
  let sectorService: SectorServiceInterface;
  let sectorRepository: SectorRepositoryInterface;

  beforeEach(() => {
    sectorRepository = new SectorRepositoryMock();
    sectorService = new SectorService(sectorRepository);
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

    it('should not be able to create a sector with already existing name', async () => {
      const findSectorByNameSpy = jest
        .spyOn(sectorRepository, 'findByName')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      const createSectorSpy = jest.spyOn(sectorRepository, 'createSector');

      await expect(async () => {
        await sectorService.createSector(createSectorMock);
      }).rejects.toThrow();
      expect(findSectorByNameSpy).toHaveBeenCalledWith(createSectorMock.name);
      expect(createSectorSpy).not.toHaveBeenCalled();
    });

    it('should throw if empty object is sent', async () => {
      const emptyError = new BadRequestException(
        'At least one field is required to create a sector',
      );
      jest.spyOn(validationUtils, 'isObjectEmpty').mockReturnValueOnce(true);

      await expect(
        sectorService.createSector({} as CreateSectorDTO),
      ).rejects.toThrow(emptyError);
    });
  });

  describe('Find by id', () => {
    it('should return a sector', async () => {
      const findByIdSpy = jest
        .spyOn(sectorRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      const sector = await sectorService.findById(sectorMock.id);

      expect(findByIdSpy).toHaveBeenCalledWith(sectorMock.id);
      expect(sector).toEqual(sectorMock);
    });

    it('should throw if sector does not exists', async () => {
      const notFoundError = new NotFoundException('Sector not found');

      const findByIdSpy = jest
        .spyOn(sectorRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(sectorService.findById('123')).rejects.toThrow(
        notFoundError,
      );
      expect(findByIdSpy).toHaveBeenCalledWith('123');
    });
  });

  describe('Update sector', () => {
    it('should be able to update a sector', async () => {
      const repositorySpy = jest
        .spyOn(sectorRepository, 'updateSector')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      jest
        .spyOn(sectorRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      const sector = await sectorService.updateSector(sectorMock.id, {
        name: sectorMock.name,
      });
      expect(repositorySpy).toHaveBeenCalledWith(sectorMock.id, {
        name: sectorMock.name,
      });
      expect(sector).toEqual(sectorMock);
    });

    it('should throw if empty object is sent', async () => {
      const emptyError = new BadRequestException(
        'At least one field is required to create a sector',
      );
      jest.spyOn(validationUtils, 'isObjectEmpty').mockReturnValueOnce(true);

      await expect(
        sectorService.updateSector('123', {} as UpdateSectorDTO),
      ).rejects.toThrow(emptyError);
    });

    it('should throw if sector does not exist', async () => {
      const notFoundError = new NotFoundException('Sector not found');
      jest
        .spyOn(sectorRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(
        sectorService.updateSector('123', sectorMock),
      ).rejects.toThrow(notFoundError);
    });

    it('should throw if sector name is already registered', async () => {
      const nameRegisteredError = new BadRequestException(
        'Sector name is already registered',
      );

      jest
        .spyOn(sectorRepository, 'findByName')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      jest
        .spyOn(sectorRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      await expect(
        sectorService.updateSector(sectorMock.id, sectorMock),
      ).rejects.toThrow(nameRegisteredError);
    });
  });

  describe('Delete sector', () => {
    it('should be able to delete a sector', async () => {
      jest
        .spyOn(sectorRepository, 'deleteSector')
        .mockReturnValueOnce(Promise.resolve(sectorMock));

      const deletedSector = await sectorService.deleteSector(sectorMock.id);

      expect(deletedSector).toEqual(sectorMock);
    });

    it('should not be able to delete a sector that does not exist', async () => {
      const notFoundError = new NotFoundException('Sector not found');

      jest
        .spyOn(sectorRepository, 'deleteSector')
        .mockResolvedValueOnce(Promise.resolve(null));

      await expect(sectorService.deleteSector(sectorMock.id)).rejects.toThrow(
        notFoundError,
      );
    });
  });
});
