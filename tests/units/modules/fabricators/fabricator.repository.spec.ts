import { FabricatorRepository } from '../../../../src/modules/fabricators/repositories/fabricators.repository';
import { FabricatorRepositoryInterface } from '../../../../src/modules/fabricators/repositories/fabricators.repository.interface';
import { mockPrisma } from '../../../__mocks__/prisma-mock';
import { createFabricatorMock, fabricatorMock } from './mocks/fabricator-mock';

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
});
