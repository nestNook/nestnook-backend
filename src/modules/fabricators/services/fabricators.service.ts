import { CreateFabricatorDTO, Fabricator, UpdateFabricatorDTO } from '../dtos';
import { FabricatorRepositoryInterface } from '../repositories/fabricators.repository.interface';
import { FabricatorServiceInterface } from './fabricators.service.interface';
import validationUtils from '@utils/validation-utils';

export class FabricatorsService implements FabricatorServiceInterface {
  constructor(
    private readonly fabricatorsRepository: FabricatorRepositoryInterface
  ) {}

  private async checkFabricator({
    registry,
    email,
    phone_number,
  }: CreateFabricatorDTO | UpdateFabricatorDTO): Promise<void> {
    const isEmpty = validationUtils.isObjectEmpty({
      registry,
      email,
      phone_number,
    });

    if(isEmpty) {
      throw new Error("At least one field is required");
    }

    const fabricatorAlreadyExists = await this.fabricatorsRepository.findOr({
      registry,
      email,
      phone_number,
    });

    if (fabricatorAlreadyExists.length > 0) {
      const errors = [];

      const registryAlreadyExists = fabricatorAlreadyExists.find(
        (fabricator) => {
          return registry === fabricator.registry;
        }
      );
      if (registryAlreadyExists) {
        errors.push('Registry already exists');
      }
      const emailAlreadyExists = fabricatorAlreadyExists.find((fabricator) => {
        return email === fabricator.email;
      });
      if (emailAlreadyExists) {
        errors.push('Email already exists');
      }
      const phoneAlreadyExists = fabricatorAlreadyExists.find((fabricator) => {
        return phone_number === fabricator.phone_number;
      });
      if (phoneAlreadyExists) {
        errors.push('Phone already exists');
      }

      if (errors.length > 0) {
        throw new Error(`Validation error: ${errors.join(', ')}`);
      }
    }
  }

  async createFabricator(dto: CreateFabricatorDTO): Promise<Fabricator> {
    await this.checkFabricator(dto);
    const fabricator = await this.fabricatorsRepository.createFabricator(dto);
    return fabricator;
  }

  async findById(id: string): Promise<Fabricator | null> {
    const fabricator = await this.fabricatorsRepository.findById(id);
    return fabricator;
  }

  async updateFabricator(
    id: string,
    dto: UpdateFabricatorDTO
  ): Promise<Fabricator | null> {
    await this.checkFabricator(dto);
    const updatedFabricator = await this.fabricatorsRepository.updateFabricator(
      id,
      dto
    );

    return updatedFabricator;
  }

  async deleteFabricator(id: string): Promise<void> {
    await this.fabricatorsRepository.deleteFabricator(id);
  }
}
