import { CreateFabricatorDTO, Fabricator } from '../dtos';

export interface FabricatorServiceInterface {
  createFabricator(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null>;
}
