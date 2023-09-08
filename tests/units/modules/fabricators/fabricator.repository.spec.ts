import { FabricatorRepositoryInterface } from '@modules/fabricators/repositories/fabricators.repository.interface';
import { FabricatorRepository } from '@modules/fabricators/repositories/fabricators.repository';
import { createFabricatorMock, fabricatorMock } from './mocks/fabricator-mock';
import { mockPrisma } from '@test/__mocks__/prisma-mock';

describe('Fabricator Repository', () => {
  let fabricatorRepository: FabricatorRepositoryInterface;

  beforeEach(() => {
    fabricatorRepository = new FabricatorRepository();
  });

  describe('Create fabricator', () => {
    it('should be able to create a fabricator', async () => {
      const createFabricatorPrismaMock =
        mockPrisma.fabricator.create.mockReturnValueOnce(
          Promise.resolve(fabricatorMock)
        );

      const fabricator = await fabricatorRepository.createFabricator(
        createFabricatorMock
      );

      expect(createFabricatorPrismaMock).toHaveBeenLastCalledWith({
        data: createFabricatorMock,
      });
      expect(fabricator).toEqual(fabricatorMock);
    });
  });

  describe('Update fabricator', () => {
    it('should be able to update a fabricator', async () => {
      const updateFabricatorPrismaMock =
        mockPrisma.fabricator.update.mockReturnValueOnce(
          Promise.resolve(fabricatorMock)
        );

      const fabricator = await fabricatorRepository.updateFabricator(
        fabricatorMock.id,
        fabricatorMock
      );

      expect(updateFabricatorPrismaMock).toHaveBeenCalledWith({
        data: fabricatorMock,
        where: { id: fabricatorMock.id}
      });
      expect(fabricator).toEqual(fabricatorMock);
    });
  });
});
