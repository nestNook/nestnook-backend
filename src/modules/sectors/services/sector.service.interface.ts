import { CreateSectorDTO, Sector } from '../dtos';

export interface SectorServiceInterface {
  createSector(dto: CreateSectorDTO): Promise<Sector>;
}
