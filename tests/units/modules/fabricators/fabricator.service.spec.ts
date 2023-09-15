import { FabricatorServiceInterface } from '@modules/fabricators/services/fabricators.service.interface';
import { FabricatorsService } from '@modules/fabricators/services/fabricators.service';
import { createFabricatorMock, fabricatorMock } from './mocks/fabricator-mock';
import { FabricatorRepositoryMock } from './mocks/fabricator-mock.repository';
import validationUtils from '@utils/validation-utils';
import { BadRequestException } from '@src/errors/bad-request-exception';
import { CreateFabricatorDTO } from '@modules/fabricators/dtos';
import { NotFoundException } from '@src/errors/not-found-exception';

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
      const emailError = new BadRequestException(
        'Validation error: Email already exists'
      );

      jest.spyOn(fabricatorRepository, 'findOr').mockReturnValueOnce(
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
      const registryError = new BadRequestException(
        'Validation error: Registry already exists'
      );

      jest.spyOn(fabricatorRepository, 'findOr').mockReturnValueOnce(
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
      const phoneError = new BadRequestException(
        'Validation error: Phone already exists'
      );

      jest.spyOn(fabricatorRepository, 'findOr').mockReturnValueOnce(
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

    it('should throw if sent object is empty', async () => {
      const emptyError = new BadRequestException(
        'At least one field is required to create a fabricator'
      );
      jest.spyOn(validationUtils, 'isObjectEmpty').mockReturnValueOnce(true);

      await expect(
        fabricatorService.createFabricator({} as CreateFabricatorDTO)
      ).rejects.toThrow(emptyError);
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

    it('should throw if email is already registered', async () => {
      const emailError = new Error('Validation error: Email already exists');

      jest
        .spyOn(fabricatorRepository, 'findOr')
        .mockReturnValueOnce(Promise.resolve([fabricatorMock]));

      await expect(
        fabricatorService.updateFabricator(fabricatorMock.id, {
          email: fabricatorMock.email,
        })
      ).rejects.toThrow(emailError);
    });

    it('should throw if registry is already registered', async () => {
      const registryError = new BadRequestException(
        'Validation error: Registry already exists'
      );

      jest
        .spyOn(fabricatorRepository, 'findOr')
        .mockReturnValueOnce(Promise.resolve([fabricatorMock]));

      await expect(
        fabricatorService.updateFabricator(fabricatorMock.id, {
          registry: fabricatorMock.registry,
        })
      ).rejects.toThrow(registryError);
    });

    it('should throw if phone number is already registered', async () => {
      const phoneError = new BadRequestException(
        'Validation error: Phone already exists'
      );

      jest
        .spyOn(fabricatorRepository, 'findOr')
        .mockReturnValueOnce(Promise.resolve([fabricatorMock]));

      await expect(
        fabricatorService.updateFabricator(fabricatorMock.id, {
          phone_number: fabricatorMock.phone_number,
        })
      ).rejects.toThrow(phoneError);
    });

    it('should return null if id does not exist', async () => {
      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'updateFabricator')
        .mockReturnValueOnce(Promise.resolve(null));

      jest
        .spyOn(fabricatorRepository, 'findOr')
        .mockReturnValueOnce(Promise.resolve([]));

      const fabricator = await fabricatorService.updateFabricator('123', {
        registry: '123',
      });

      expect(fabricator).toBe(null);
      expect(repositorySpy).toHaveBeenCalledWith('123', { registry: '123' });
    });

    it('should throw if sent object is empty', async () => {
      const emptyError = new BadRequestException(
        'At least one field is required to update a fabricator'
      );
      jest.spyOn(validationUtils, 'isObjectEmpty').mockReturnValueOnce(true);

      await expect(
        fabricatorService.updateFabricator('123', {})
      ).rejects.toThrow(emptyError);
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

    it('should return null if fabricator is not found', async () => {
      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(null));

      const fabricator = await fabricatorService.findById('123');

      expect(fabricator).toBe(null);
      expect(repositorySpy).toHaveBeenCalledWith('123');
    });
  });

  describe('delete fabricator', () => {
    it('should be able to delete a fabricator', async () => {
      const repositorySpy = jest
        .spyOn(fabricatorRepository, 'deleteFabricator')
        .mockReturnValueOnce(Promise.resolve(fabricatorMock));

      const deletedFabricator = await fabricatorService.deleteFabricator(
        fabricatorMock.id
      );
      
      expect(deletedFabricator).toEqual(fabricatorMock);
      expect(repositorySpy).toHaveBeenCalledWith(fabricatorMock.id);
    });

    it('should not be able to delete a user that does not exist', async () => {
      const error = new NotFoundException('Fabricator not found');

      const deleteFabricatorRepositorySpy = jest
        .spyOn(fabricatorRepository, 'deleteFabricator')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(
        fabricatorService.deleteFabricator(fabricatorMock.id)
      ).rejects.toThrow(error);

      expect(deleteFabricatorRepositorySpy).toHaveBeenCalledWith(
        fabricatorMock.id
      );
    });
  });
});
