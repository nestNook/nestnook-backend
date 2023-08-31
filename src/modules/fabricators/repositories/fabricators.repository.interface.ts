import { CreateFabricatorDTO, Fabricator } from '../dtos';
export interface FabricatorRepositoryInterface {
  createProduct(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null>;
}
