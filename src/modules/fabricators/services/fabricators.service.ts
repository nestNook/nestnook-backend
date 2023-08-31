import { CreateFabricatorDTO } from '../dtos/create-fabricator.dto';
import { Fabricator } from '../dtos/fabricator.dto';
import { FabricatorRepositoryInterface } from '../repositories/fabricators.repository.interface';
import { FabricatorServiceInterface } from './fabricators.service.interface';

export class FabricatorsService implements FabricatorServiceInterface {
  constructor(
    private readonly fabricatorssRepository: FabricatorRepositoryInterface
  ) {}

  async createProduct(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null> {
    const fabricator = await this.fabricatorssRepository.createProduct(
      createFabricatorDto
    );
    return fabricator;
  }
}
