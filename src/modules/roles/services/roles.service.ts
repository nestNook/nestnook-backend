import { RolesServiceInterface } from './roles.service.interface';
import { RolesRepositoryInterface } from '../repositories/roles.repository.interface';

export class RolesService implements RolesServiceInterface {
  constructor(private readonly rolesRepository: RolesRepositoryInterface) {}
}
