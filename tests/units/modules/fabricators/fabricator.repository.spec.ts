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
        where: { id: fabricatorMock.id },
      });
      expect(fabricator).toEqual(fabricatorMock);
    });
  });

  describe('Find fabricator by id', () => {
    it('should return a fabricator', async () => {
      const findByIdPrismaMock =
        mockPrisma.fabricator.findFirst.mockReturnValueOnce(
          Promise.resolve(fabricatorMock)
        );

      const fabricator = await fabricatorRepository.findById(fabricatorMock.id);

      expect(findByIdPrismaMock).toHaveBeenCalledWith({
        where: { id: fabricatorMock.id },
      });
      expect(fabricator).toEqual(fabricatorMock);
    });
  });

  describe('Find fabricator by query', () => {
    it('should return a fabricator', async () => {
      const findPrismaMock =
        mockPrisma.fabricator.findFirst.mockReturnValueOnce(
          Promise.resolve(fabricatorMock)
        );

      const fabricator = await fabricatorRepository.find({
        email: fabricatorMock.email,
      });

      expect(findPrismaMock).toHaveBeenCalledWith({
        where: { email: fabricatorMock.email },
      });
      expect(fabricator).toEqual(fabricatorMock);
    });
  });

  describe('Delete fabricator', () => {
    it('should be able to delete a fabricator', async () => {
      const deletePrismaMock = mockPrisma.fabricator.delete.mockReturnValueOnce(
        Promise.resolve(null)
      );

      const fabricator = await fabricatorRepository.deleteFabricator(
        fabricatorMock.id
      );

      expect(deletePrismaMock).toHaveBeenCalledWith({
        where: { id: fabricatorMock.id },
      });
      expect(fabricator).toBe(null);
    });
  });

  describe('FindOr query', () => {
    it('should return a fabricator', async () => {
      const findOrPrismaMock =
        mockPrisma.fabricator.findMany.mockReturnValueOnce(
          Promise.resolve(fabricatorMock)
        );

      const fabricator = await fabricatorRepository.findOr({
        email: fabricatorMock.email,
      });

      expect(fabricator).toEqual(fabricatorMock);
      expect(findOrPrismaMock).toHaveBeenCalledWith({
        where: {
          OR: [
            { email: fabricatorMock.email },
            { phone_number: undefined },
            { registry: undefined },
          ],
        },
      });
    });
  });
});
