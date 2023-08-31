import { prisma } from '../../../infra/database';
import { CreateSectorDTO, Sector } from '../dtos';
import { SectorRepositoryInterface } from './sector.repository.interface';

export class SectorRepository implements SectorRepositoryInterface {
  async findSectorByName(name: string): Promise<Sector | null> {
    const sector = await prisma.sector.findFirst({
      where: {
        name,
      },
    });

    return sector;
  }

  async createSector(dto: CreateSectorDTO): Promise<Sector> {
    const sector = await prisma.sector.create({ data: dto });
    return sector;
  }
}
