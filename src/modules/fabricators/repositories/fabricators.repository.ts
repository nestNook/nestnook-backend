import { prisma } from '../../../infra/database';
import {
  type CreateFabricatorDTO,
  type Fabricator,
  type FabricatorQuery,
  type UpdateFabricatorDTO,
} from '../dtos';
import { type FabricatorRepositoryInterface } from './fabricators.repository.interface';

export class FabricatorRepository implements FabricatorRepositoryInterface {
  async createFabricator(
    createFabricatorDto: CreateFabricatorDTO,
  ): Promise<Fabricator> {
    const fabricator = await prisma.fabricator.create({
      data: createFabricatorDto,
    });
    return fabricator;
  }

  async findById(id: string): Promise<Fabricator | null> {
    const fabricator = await prisma.fabricator.findFirst({
      where: {
        id,
      },
    });
    return fabricator;
  }

  async find(dto: FabricatorQuery): Promise<Fabricator | null> {
    const fabricator = await prisma.fabricator.findFirst({
      where: dto,
    });
    return fabricator;
  }

  async updateFabricator(
    id: string,
    updateFabricatorDto: UpdateFabricatorDTO,
  ): Promise<Fabricator | null> {
    const updatedFabricator = await prisma.fabricator.update({
      where: {
        id,
      },
      data: updateFabricatorDto,
    });
    return updatedFabricator;
  }

  async deleteFabricator(id: string): Promise<Fabricator> {
    const fabricator = await prisma.fabricator.delete({
      where: { id },
    });
    return fabricator;
  }

  async findOr(query: FabricatorQuery): Promise<Fabricator[]> {
    const fabricator = await prisma.fabricator.findMany({
      where: {
        OR: [
          { email: query.email },
          { phone_number: query.phone_number },
          { registry: query.registry },
        ],
      },
    });

    return fabricator;
  }
}
