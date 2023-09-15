import { type SessionDTO } from '@@types/session.dto';
import {
  type GetUserDTO,
  type UpdatePasswordDTO,
  type UpdateUserDTO,
  type CreateUserDTO,
  type GivePrivilegesDTO,
  type User,
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
  givePrivileges: (user: User, dto: GivePrivilegesDTO) => Promise<void>;
}
