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
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Create fabricator', () => {
    it('should be able to create a fabricator', async () => {
      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'createFabricator')
        .mockReturnValueOnce(Promise.resolve(fabricatorMock));

      jest
        .spyOn(fabricatorRepository, 'findOr')
        .mockReturnValueOnce(Promise.resolve([]));

      const fabricator = await fabricatorService.createFabricator(
        createFabricatorMock
      );
      expect(repositorySpy).toHaveBeenCalledWith(createFabricatorMock);
      expect(fabricator).toEqual(fabricatorMock);
    });

    it('should throw if email is already registered', async () => {
      const emailError = new Error('Validation error: Email already exists');

      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'findOr')
        .mockReturnValueOnce(
          Promise.resolve([
            {
              email: createFabricatorMock.email,
            },
          ])
        );

      await expect(
        fabricatorService.createFabricator(createFabricatorMock)
      ).rejects.toThrow(emailError);
    });

    it('should throw if registry is already registered', async () => {
      const registryError = new Error(
        'Validation error: Registry already exists'
      );

      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'findOr')
        .mockReturnValueOnce(
          Promise.resolve([
            {
              registry: createFabricatorMock.registry,
            },
          ])
        );

      await expect(
        fabricatorService.createFabricator(createFabricatorMock)
      ).rejects.toThrow(registryError);
    });

    it('should throw if phone number is already registered', async () => {
      const phoneError = new Error('Validation error: Phone already exists');

      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'findOr')
        .mockReturnValueOnce(
          Promise.resolve([
            {
              phone_number: createFabricatorMock.phone_number,
            },
          ])
        );

      await expect(
        fabricatorService.createFabricator(createFabricatorMock)
      ).rejects.toThrow(phoneError);
    });
  });

  describe('Update fabricator', () => {
    it('should be able to update a fabricator', async () => {
      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'updateFabricator')
        .mockReturnValueOnce(Promise.resolve(fabricatorMock));

      jest
        .spyOn(fabricatorRepository, 'findOr')
        .mockReturnValueOnce(Promise.resolve([]));

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

  describe('Find fabricator by id', () => {
    it('should return a fabricator', async () => {
      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(fabricatorMock));

      const fabricator = await fabricatorService.findById(fabricatorMock.id);

      expect(repositorySpy).toHaveBeenCalledWith(fabricatorMock.id);
      expect(fabricator).toEqual(fabricatorMock);
    });
  });

  describe('delete fabricator', () => {
    it('should be able to delete a fabricator', async () => {
      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'deleteFabricator')
        .mockReturnValueOnce(Promise.resolve());

      await fabricatorService.deleteFabricator(fabricatorMock.id);

      expect(repositorySpy).toHaveBeenCalledWith(fabricatorMock.id);
    });
  });
});
