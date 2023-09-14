import {
  type CreateFabricatorDTO,
  type Fabricator,
  type UpdateFabricatorDTO,
  type FabricatorQuery,
} from '../dtos';
export interface FabricatorRepositoryInterface {
  createFabricator: (
    createFabricatorDto: CreateFabricatorDTO,
  ) => Promise<Fabricator>;

  findById: (id: string) => Promise<Fabricator | null>;

  find: (dto: FabricatorQuery) => Promise<Fabricator | null>;

  updateFabricator: (
    id: string,
    updateFabricatorDto: UpdateFabricatorDTO,
  ) => Promise<Fabricator | null>;

  deleteFabricator: (id: string) => Promise<Fabricator>;

  findOr: (query: FabricatorQuery) => Promise<Fabricator[]>;
}
