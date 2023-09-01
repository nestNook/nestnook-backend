import { CreateFabricatorDTO, Fabricator } from '../dtos';
import { FabricatorRepositoryInterface } from '../repositories/fabricators.repository.interface';
import { FabricatorServiceInterface } from './fabricators.service.interface';

export class FabricatorsService implements FabricatorServiceInterface {
  constructor(
    private readonly fabricatorsRepository: FabricatorRepositoryInterface
  ) {}

  async createFabricator(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null> {
    const fabricator = await this.fabricatorsRepository.createFabricator(
      createFabricatorDto
    );
    return fabricator;
  }
}
