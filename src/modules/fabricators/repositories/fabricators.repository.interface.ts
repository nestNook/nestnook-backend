import { CreateFabricatorDTO, Fabricator } from '../dtos';
export interface FabricatorRepositoryInterface {
  createFabricator(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null>;
}
