import { CreateFabricatorDTO, Fabricator } from '../dtos';

export interface FabricatorServiceInterface {
  createProduct(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null>;
}
