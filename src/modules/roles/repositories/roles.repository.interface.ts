import { CreateRoleDTO, Role, UpdateRoleDTO } from '../dtos';

export interface RolesRepositoryInterface {
  create(dto: CreateRoleDTO): Promise<Role>;
  getById(id: string): Promise<Role | null>;
  getByName(name: string): Promise<Role | null>;
  getAll(): Promise<Role[]>;
  delete(id: string): Promise<Role | null>;
  update(id: string, dto: UpdateRoleDTO): Promise<Role | null>;
}
