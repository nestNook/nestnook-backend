import { UsersRepositoryInterface } from '@modules/users/repositories/users.repository.interface';

export class UsersRepositoryMock implements UsersRepositoryInterface {
  create = jest.fn();
  find = jest.fn();
  findById = jest.fn();
  delete = jest.fn();
  update = jest.fn();
}
