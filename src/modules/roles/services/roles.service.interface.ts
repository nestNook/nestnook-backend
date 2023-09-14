import { CreateRoleDTO, Role, UpdateRoleDTO } from '../dtos';

export interface RolesServiceInterface {
  createRole(dto: CreateRoleDTO): Promise<Role>;
  getRoleById(id: string): Promise<Role>;
  getAllRoles(): Promise<Role[]>;
  deleteRole(id: string): Promise<Role>;
  updateRole(id: string, dto: UpdateRoleDTO): Promise<Role>;
}
