import { type SessionDTO } from '@@types/session.dto';
import { type CreateUserDTO } from '../dtos/create-user.dto';
import {
  type GetUserDTO,
  type UpdatePasswordDTO,
  type UpdateUserDTO,
} from '../dtos';

export interface UsersServiceInterface {
  createUser: (dto: CreateUserDTO) => Promise<SessionDTO>;
  getUserById: (userId: string) => Promise<GetUserDTO | null>;
  getUserByEmail: (email: string) => Promise<GetUserDTO | null>;
  deleteUserById: (id: string) => Promise<GetUserDTO | null>;
  updateUserById: (
    id: string,
    dto: UpdateUserDTO,
  ) => Promise<GetUserDTO | null>;
  updateUserPassword: (userId: string, dto: UpdatePasswordDTO) => Promise<void>;
}
