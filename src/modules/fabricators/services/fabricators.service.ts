import {
  type CreateFabricatorDTO,
  type Fabricator,
  type UpdateFabricatorDTO,
} from '../dtos';
import { type FabricatorRepositoryInterface } from '../repositories/fabricators.repository.interface';
import { type FabricatorServiceInterface } from './fabricators.service.interface';
import validationUtils from '@utils/validation-utils';
import { NotFoundException } from '@src/errors/not-found-exception';
import { BadRequestException } from '@src/errors/bad-request-exception';

export class FabricatorsService implements FabricatorServiceInterface {
  constructor(
    private readonly fabricatorsRepository: FabricatorRepositoryInterface,
  ) {}

  private async checkFabricator({
    registry,
    email,
    phone_number,
  }: CreateFabricatorDTO | UpdateFabricatorDTO): Promise<void> {
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
        },
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
        throw new BadRequestException(`Validation error: ${errors.join(', ')}`);
      }
    }
  }

  async createFabricator(dto: CreateFabricatorDTO): Promise<Fabricator> {
    const isEmpty = validationUtils.isObjectEmpty(dto);

    if (isEmpty) {
      throw new BadRequestException(
        'At least one field is required to create a fabricator',
      );
    }

    await this.checkFabricator(dto);
    const fabricator = await this.fabricatorsRepository.createFabricator(dto);
    return fabricator;
  }

  async findById(id: string): Promise<Fabricator> {
    const fabricator = await this.fabricatorsRepository.findById(id);

    if (!fabricator) {
      throw new NotFoundException('Fabricator not found');
    }

    return fabricator;
  }

  async updateFabricator(
    id: string,
    dto: UpdateFabricatorDTO,
  ): Promise<Fabricator> {
    await this.checkFabricator(dto);
    const updatedFabricator = await this.fabricatorsRepository.updateFabricator(
      id,
      dto,
    );

    if (!updatedFabricator) {
      throw new NotFoundException('Fabricator not found');
    }

    return updatedFabricator;
  }

  async deleteFabricator(id: string): Promise<Fabricator> {
    const deletedFabricator =
      await this.fabricatorsRepository.deleteFabricator(id);

    if (!deletedFabricator) {
      throw new NotFoundException('Fabricator not found');
    }
    return deletedFabricator;
  }
}
