import {
  type InternCreateUserDTO,
  type UpdateUserDTO,
  type User,
  type UserQuery,
} from '../dtos';
export interface UsersRepositoryInterface {
  create: (dto: InternCreateUserDTO) => Promise<User>;
  find: (dto: UserQuery) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  delete: (id: string) => Promise<User | null>;
  update: (id: string, dto: UpdateUserDTO) => Promise<User | null>;
}
