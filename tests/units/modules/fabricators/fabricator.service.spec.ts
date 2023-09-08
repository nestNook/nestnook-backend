import { FabricatorServiceInterface } from '@modules/fabricators/services/fabricators.service.interface';
import { FabricatorsService } from '@modules/fabricators/services/fabricators.service';
import { createFabricatorMock, fabricatorMock } from './mocks/fabricator-mock';
import { FabricatorRepositoryMock } from './mocks/fabricator-mock.repository';

describe('Fabricator service', () => {
  let fabricatorService: FabricatorServiceInterface;
  let fabricatorRepository: FabricatorRepositoryMock;

  beforeEach(() => {
    fabricatorRepository = new FabricatorRepositoryMock();
    fabricatorService = new FabricatorsService(fabricatorRepository);
  });

  describe('Create fabricator', () => {
    it('should be able to create a fabricator', async () => {
      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'createFabricator')
        .mockReturnValueOnce(Promise.resolve(fabricatorMock));

      const fabricator = await fabricatorService.createFabricator(
        createFabricatorMock
      );
      expect(repositorySpy).toHaveBeenCalledWith(createFabricatorMock);
      expect(fabricator).toEqual(fabricatorMock);
    });
  });

  describe('Update fabricator', () => {
    it('should be able to update a fabricator', async () => {
      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'updateFabricator')
        .mockReturnValueOnce(Promise.resolve(fabricatorMock));

      const fabricator = await fabricatorService.updateFabricator(
        fabricatorMock.id,
        {
          name: fabricatorMock.name,
        }
      );
      expect(repositorySpy).toHaveBeenCalledWith(fabricatorMock.id, {
        name: fabricatorMock.name,
      });
      expect(fabricator).toEqual(fabricatorMock);
    });
  });
});
