import {
  type CreateFabricatorDTO,
  type Fabricator,
  type UpdateFabricatorDTO,
} from '../dtos';

export interface FabricatorServiceInterface {
  createFabricator: (
    createFabricatorDto: CreateFabricatorDTO,
  ) => Promise<Fabricator>;
  findById: (id: string) => Promise<Fabricator>;
  updateFabricator: (
    id: string,
    updateFabricatorDto: UpdateFabricatorDTO,
  ) => Promise<Fabricator>;
  deleteFabricator: (id: string) => Promise<Fabricator>;
}
