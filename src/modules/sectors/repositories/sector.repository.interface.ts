import { type CreateSectorDTO, type Sector } from '../dtos';
import { UpdateSectorDTO } from '../dtos/update-sector.dto';

export interface SectorRepositoryInterface {
  createSector: (dto: CreateSectorDTO) => Promise<Sector>;
  findById: (name: string) => Promise<Sector | null>;
  updateSector: (
    id: string,
    updateSectorDto: UpdateSectorDTO,
  ) => Promise<Sector>;
  findByName: (name: string) => Promise<Sector | null>;
  deleteSector: (id: string) => Promise<Sector | null>;
}
