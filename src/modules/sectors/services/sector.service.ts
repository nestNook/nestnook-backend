import { type CreateSectorDTO, type Sector } from '../dtos';
import { type SectorServiceInterface } from './sector.service.interface';
import { type SectorRepositoryInterface } from '../repositories/sector.repository.interface';

export class SectorService implements SectorServiceInterface {
  constructor(private readonly sectorRepository: SectorRepositoryInterface) {}

  async createSector(dto: CreateSectorDTO): Promise<Sector> {
    const sectorAlreadyExists = await this.sectorRepository.findSectorByName(
      dto.name,
    );

    if (sectorAlreadyExists) {
      throw new Error(`Sector '${dto.name}' already exists.`);
    }

    const sector = await this.sectorRepository.createSector(dto);
    return sector;
  }
}
