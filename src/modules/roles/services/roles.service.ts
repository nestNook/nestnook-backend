import { type UsersRepositoryInterface } from '@modules/users/repositories/users.repository.interface';
import { type RolesRepositoryInterface } from '../repositories/roles.repository.interface';
import { BadRequestException } from '@src/errors/bad-request-exception';
import { ForbiddenException } from '@src/errors/forbidden-exception';
import { NotFoundException } from '@src/errors/not-found-exception';
import { type RolesServiceInterface } from './roles.service.interface';
import { type CreateRoleDTO, type Role, type UpdateRoleDTO } from '../dtos';
import validationUtils from '@utils/validation-utils';

export class RolesService implements RolesServiceInterface {
  constructor(
    private readonly rolesRepository: RolesRepositoryInterface,
    private readonly usersRepository: UsersRepositoryInterface,
  ) {}

  async createRole(dto: CreateRoleDTO): Promise<Role> {
    const roleNameAlreadyExists = await this.rolesRepository.getByName(
      dto.name,
    );

    if (roleNameAlreadyExists) {
      throw new BadRequestException('Rome name already exists');
    }

    const role = await this.rolesRepository.create(dto);

    return role;
  }

  async getRoleById(id: string): Promise<Role> {
    const role = await this.rolesRepository.getById(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async getAllRoles(): Promise<Role[]> {
    const roles = await this.rolesRepository.getAll();
    return roles;
  }

  async deleteRole(id: string): Promise<Role> {
    const isRoleInUse = await this.usersRepository.find({
      role_id: id,
    });

    if (isRoleInUse) {
      throw new ForbiddenException('Role in use');
    }

    const role = await this.rolesRepository.delete(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async updateRole(id: string, dto: UpdateRoleDTO): Promise<Role> {
    if (validationUtils.isObjectEmpty(dto)) {
      throw new BadRequestException('At least one field required to update');
    }

    if (dto.name) {
      const roleNameAlreadyExists = await this.rolesRepository.getByName(
        dto.name,
      );

      if (roleNameAlreadyExists) {
        throw new BadRequestException('Role name already exists');
      }
    }

    const role = await this.rolesRepository.update(id, dto);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }
}
