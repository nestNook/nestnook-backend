import { type CreateSectorDTO, type Sector } from '../dtos';
import { type SectorServiceInterface } from './sector.service.interface';
import { type SectorRepositoryInterface } from '../repositories/sector.repository.interface';
import { BadRequestException } from '@src/errors/bad-request-exception';
import validationUtils from '@utils/validation-utils';
import { NotFoundException } from '@src/errors/not-found-exception';
import { UpdateSectorDTO } from '../dtos/update-sector.dto';

export class SectorService implements SectorServiceInterface {
  constructor(private readonly sectorRepository: SectorRepositoryInterface) {}

  async createSector(dto: CreateSectorDTO): Promise<Sector> {
    const isEmpty = validationUtils.isObjectEmpty(dto);

    if (isEmpty) {
      throw new BadRequestException(
        'At least one field is required to create a sector',
      );
    }

    const sectorAlreadyExists = await this.sectorRepository.findByName(
      dto.name,
    );

    if (sectorAlreadyExists) {
      throw new BadRequestException(`Sector '${dto.name}' already exists.`);
    }

    const sector = await this.sectorRepository.createSector(dto);
    return sector;
  }

  async findById(id: string): Promise<Sector> {
    const sector = await this.sectorRepository.findById(id);
    if (!sector) {
      throw new NotFoundException('Sector not found');
    }

    return sector;
  }

  async updateSector(id: string, dto: UpdateSectorDTO): Promise<Sector> {
    const isEmpty = validationUtils.isObjectEmpty(dto);
    if (isEmpty) {
      throw new BadRequestException(
        'At least one field is required to create a sector',
      );
    }
    const sector = await this.sectorRepository.findById(id);

    if (!sector) {
      throw new NotFoundException('Sector not found');
    }

    const sectorAlreadyExists = await this.sectorRepository.findByName(
      sector.name,
    );
    if (sectorAlreadyExists) {
      throw new BadRequestException('Sector name is already registered');
    }

    const updatedSector = await this.sectorRepository.updateSector(id, dto);

    return updatedSector;
  }

  async deleteSector(id: string): Promise<Sector> {
    const deletedSector = await this.sectorRepository.deleteSector(id);

    if (!deletedSector) {
      throw new NotFoundException('Sector not found');
    }

    return deletedSector;
  }
}
