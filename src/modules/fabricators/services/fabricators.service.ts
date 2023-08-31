import { CreateFabricatorDTO, Fabricator } from '../dtos';
import { FabricatorRepositoryInterface } from '../repositories/fabricators.repository.interface';
import { FabricatorServiceInterface } from './fabricators.service.interface';

export class FabricatorsService implements FabricatorServiceInterface {
  constructor(
    private readonly fabricatorssRepository: FabricatorRepositoryInterface
  ) {}

  async createFabricator(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null> {
    const fabricator = await this.fabricatorssRepository.createFabricator(
      createFabricatorDto
    );
    return fabricator;
  }
}
