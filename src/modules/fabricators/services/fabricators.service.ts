import { CreateFabricatorDTO, Fabricator, UpdateFabricatorDTO } from '../dtos';
import { FabricatorRepositoryInterface } from '../repositories/fabricators.repository.interface';
import { FabricatorServiceInterface } from './fabricators.service.interface';

export class FabricatorsService implements FabricatorServiceInterface {
  constructor(
    private readonly fabricatorsRepository: FabricatorRepositoryInterface
  ) {}

  async createFabricator(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator> {
    const fabricatorAlreadyExists = await this.fabricatorsRepository.findByEmail(createFabricatorDto.email)

    if(fabricatorAlreadyExists) {
      throw new Error('Email already registered')
    }
    const fabricator = await this.fabricatorsRepository.createFabricator(
      createFabricatorDto
    );
    return fabricator;
  }

  async findById(id: string): Promise<Fabricator | null> {
    const fabricator = await this.fabricatorsRepository.findById(id);
    return fabricator;
  }

  async findByEmail(email: string): Promise<Fabricator | null> {
    const fabricator = await this.fabricatorsRepository.findByEmail(email);
    return fabricator;
  }

  async updateFabricator(
    id: string,
    updateFabricatorDto: UpdateFabricatorDTO
  ): Promise<Fabricator | null> {
    const updatedFabricator = await this.fabricatorsRepository.updateFabricator(
      id,
      updateFabricatorDto
    );
    return updatedFabricator;
  }

  async deleteFabricator(id: string): Promise<void> {
    await this.fabricatorsRepository.deleteFabricator(id);
    return
  }
}
