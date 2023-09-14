import { type CreateSectorDTO, type Sector } from '../dtos';

export interface SectorRepositoryInterface {
  createSector: (dto: CreateSectorDTO) => Promise<Sector>;
  findSectorByName: (name: string) => Promise<Sector | null>;
}
