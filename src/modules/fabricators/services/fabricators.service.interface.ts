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
<<<<<<< HEAD
    updateFabricatorDto: UpdateFabricatorDTO
  ): Promise<Fabricator | null>;

  deleteFabricator(id: string): Promise<Fabricator | null>
=======
    updateFabricatorDto: UpdateFabricatorDTO,
  ) => Promise<Fabricator | null>;
  deleteFabricator: (id: string) => Promise<void>;
>>>>>>> 962e9cb6e70c8dd133a14f84c3b327a76c6a5757
}
