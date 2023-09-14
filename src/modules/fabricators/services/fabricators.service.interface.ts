import {
  type CreateFabricatorDTO,
  type Fabricator,
  type UpdateFabricatorDTO,
} from '../dtos';

export interface FabricatorServiceInterface {
  createFabricator: (
    createFabricatorDto: CreateFabricatorDTO,
  ) => Promise<Fabricator>;
  findById: (id: string) => Promise<Fabricator | null>;
  updateFabricator: (
    id: string,
    updateFabricatorDto: UpdateFabricatorDTO,
  ) => Promise<Fabricator | null>;
  deleteFabricator: (id: string) => Promise<void>;
}
