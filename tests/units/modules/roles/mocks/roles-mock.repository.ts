import { type RolesRepositoryInterface } from '@modules/roles/repositories/roles.repository.interface';

export class RolesRepositoryMock implements RolesRepositoryInterface {
  create = jest.fn();
  getById = jest.fn();
  getByName = jest.fn();
  getAll = jest.fn();
  delete = jest.fn();
  update = jest.fn();
}
