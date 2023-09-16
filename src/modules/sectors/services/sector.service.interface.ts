import { type CreateSectorDTO, type Sector } from '../dtos';
import { UpdateSectorDTO } from '../dtos/update-sector.dto';

export interface SectorServiceInterface {
  createSector: (dto: CreateSectorDTO) => Promise<Sector>;
  findById: (id: string) => Promise<Sector>;
  updateSector: (
    id: string,
    updateSectorDto: UpdateSectorDTO,
  ) => Promise<Sector>;
  deleteSector: (id: string) => Promise<Sector>;
}
