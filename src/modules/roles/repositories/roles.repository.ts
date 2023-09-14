import { type RolesRepositoryInterface } from './roles.repository.interface';
import { type CreateRoleDTO, type Role, type UpdateRoleDTO } from '../dtos';
import { prisma } from '@infra/database';

export class RolesRepository implements RolesRepositoryInterface {
  async create(dto: CreateRoleDTO): Promise<Role> {
    const role = await prisma.role.create({
      data: dto,
    });

    return role;
  }

  async getById(id: string): Promise<Role | null> {
    const role = await prisma.role.findFirst({
      where: {
        id,
      },
    });

    return role;
  }

  async getByName(name: string): Promise<Role | null> {
    const role = await prisma.role.findFirst({
      where: {
        name,
      },
    });

    return role;
  }

  async getAll(): Promise<Role[]> {
    const role = await prisma.role.findMany();
    return role;
  }

  async delete(id: string): Promise<Role | null> {
    const role = await prisma.role.delete({
      where: {
        id,
      },
    });

    return role;
  }

  async update(id: string, dto: UpdateRoleDTO): Promise<Role | null> {
    const role = await prisma.role.update({
      where: {
        id,
      },
      data: dto,
    });

    return role;
  }
}
