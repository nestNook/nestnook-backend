import { CreateFabricatorDTO, Fabricator, UpdateFabricatorDTO } from '../dtos';
export interface FabricatorRepositoryInterface {
  createFabricator(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator>;

  findById(id: string): Promise<Fabricator | null>;

  findByEmail(email: string): Promise<Fabricator | null>

  updateFabricator(id: string, updateFabricatorDto: UpdateFabricatorDTO): Promise<Fabricator | null>

  deleteFabricator(id: string): Promise<Fabricator | null>
}
