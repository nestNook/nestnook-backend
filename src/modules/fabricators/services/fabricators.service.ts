import { CreateFabricatorDTO, Fabricator, UpdateFabricatorDTO } from '../dtos';
import { FabricatorRepositoryInterface } from '../repositories/fabricators.repository.interface';
import { FabricatorServiceInterface } from './fabricators.service.interface';

export class FabricatorsService implements FabricatorServiceInterface {
  constructor(
    private readonly fabricatorsRepository: FabricatorRepositoryInterface
  ) {}

  async createFabricator({
    registry,
    email,
    phone_number,
    name,
  }: CreateFabricatorDTO): Promise<Fabricator> {
    const registryAlreadyExists = await this.fabricatorsRepository.find({
      registry,
    });

    const emailAlreadyExists = await this.fabricatorsRepository.find({
      email,
    });

    const phoneAlreadyExists = await this.fabricatorsRepository.find({
      phone_number,
    });

    if (registryAlreadyExists) {
      throw new Error('Registry already exists');
    }

    if (emailAlreadyExists) {
      throw new Error('Email already exists');
    }
    if (phoneAlreadyExists) {
      throw new Error('Phone already exists');
    }

    const fabricator = await this.fabricatorsRepository.createFabricator({
      registry,
      name,
      phone_number,
      email,
    });
    return fabricator;
  }

  async findById(id: string): Promise<Fabricator | null> {
    const fabricator = await this.fabricatorsRepository.findById(id);
    return fabricator;
  }

  async updateFabricator(
    id: string,
    { registry, name, phone_number, email }: UpdateFabricatorDTO
  ): Promise<Fabricator | null> {
    const registryAlreadyExists = await this.fabricatorsRepository.find({
      registry,
    });

    const emailAlreadyExists = await this.fabricatorsRepository.find({
      email,
    });

    const phoneAlreadyExists = await this.fabricatorsRepository.find({
      phone_number,
    });

    if (registryAlreadyExists) {
      throw new Error('Registry already exists');
    }

    if (emailAlreadyExists) {
      throw new Error('Email already exists');
    }
    if (phoneAlreadyExists) {
      throw new Error('Phone already exists');
    }
    const updatedFabricator = await this.fabricatorsRepository.updateFabricator(
      id,
      {
        registry,
        name,
        phone_number,
        email,
      }
    );

    return updatedFabricator;
  }

  async deleteFabricator(id: string): Promise<void> {
    await this.fabricatorsRepository.deleteFabricator(id);
    return;
  }
}
