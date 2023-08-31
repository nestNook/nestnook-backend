import { CreateFabricatorDTO } from '../dtos/create-fabricator.dto';
import { Fabricator } from '../dtos/fabricator.dto';

export interface FabricatorServiceInterface {
  createProduct(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null>;
}
