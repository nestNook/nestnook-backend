import { prisma } from '../../../infra/database';
import { CreateFabricatorDTO, Fabricator } from '../dtos';
import { FabricatorRepositoryInterface } from './fabricators.repository.interface';

export class FabricatorRepository implements FabricatorRepositoryInterface {
  async createFabricator(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null> {
    const fabricator = await prisma.fabricator.create({
      data: createFabricatorDto,
    });
    return fabricator;
  }
}
