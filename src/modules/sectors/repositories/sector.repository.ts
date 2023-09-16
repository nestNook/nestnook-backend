import { prisma } from '../../../infra/database';
import { type CreateSectorDTO, type Sector } from '../dtos';
import { UpdateSectorDTO } from '../dtos/update-sector.dto';
import { type SectorRepositoryInterface } from './sector.repository.interface';

export class SectorRepository implements SectorRepositoryInterface {
  async createSector(dto: CreateSectorDTO): Promise<Sector> {
    const sector = await prisma.sector.create({ data: dto });
    return sector;
  }

  async findByName(name: string): Promise<Sector | null> {
    const sector = await prisma.sector.findFirst({
      where: {
        name,
      },
    });

    return sector;
  }

  async findById(id: string): Promise<Sector | null> {
    const sector = await prisma.sector.findFirst({
      where: {
        id,
      },
    });
    return sector;
  }

  async updateSector(
    id: string,
    updateSectorDto: UpdateSectorDTO,
  ): Promise<Sector> {
    const updatedSector = await prisma.sector.update({
      where: {
        id,
      },
      data: updateSectorDto,
    });

    return updatedSector;
  }

  async deleteSector(id: string): Promise<Sector> {
    const sector = await prisma.sector.delete({
      where: { id },
    });

    return sector;
  }
}
