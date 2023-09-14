import { type CreateSectorDTO, type Sector } from '../dtos';

export interface SectorServiceInterface {
  createSector: (dto: CreateSectorDTO) => Promise<Sector>;
}
