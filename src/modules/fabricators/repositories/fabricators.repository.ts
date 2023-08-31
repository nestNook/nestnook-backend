import { prisma } from '../../../infra/database';
import { CreateFabricatorDTO } from '../dtos/create-fabricator.dto';
import { Fabricator } from '../dtos/fabricator.dto';
import { FabricatorRepositoryInterface } from './fabricators.repository.interface';

export class FabricatorRepository implements FabricatorRepositoryInterface {
  async createProduct(
    createFabricatorDto: CreateFabricatorDTO
  ): Promise<Fabricator | null> {
    const fabricator = await prisma.fabricator.create({
      data: createFabricatorDto,
    });
    return fabricator;
  }
}
