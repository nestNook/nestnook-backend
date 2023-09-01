import { UsersRepositoryInterface } from '../repositories/users.repository.interface';
import { UsersServiceInterface } from './users.service.interface';

export class UsersService implements UsersServiceInterface {
  constructor(private readonly usersRepository: UsersRepositoryInterface) {}
}
