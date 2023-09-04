import { InternCreateUserDTO, User } from '../dto';
export interface UsersRepositoryInterface {
  create(dto: InternCreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
