import { CreateSectorDTO, Sector } from '../dtos';
import { SectorServiceInterface } from './sector.service.interface';
import { SectorRepositoryInterface } from '../repositories/sector.repository.interface';

export class SectorService implements SectorServiceInterface {
  constructor(private readonly sectorRepository: SectorRepositoryInterface) {}

  async createSector(dto: CreateSectorDTO): Promise<Sector> {
    const sectorAlreadyExists = await this.sectorRepository.findSectorByName(
      dto.name
    );

    if (sectorAlreadyExists) {
      throw new Error(`Sector '${dto.name}' already exists.`);
    }

    const sector = await this.sectorRepository.createSector(dto);
    return sector;
  }
}
