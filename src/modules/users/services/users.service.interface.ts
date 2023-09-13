import { SessionDTO } from '@@types/session.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { GetUserDTO, UpdatePasswordDTO, UpdateUserDTO } from '../dtos';

export interface UsersServiceInterface {
  createUser(dto: CreateUserDTO): Promise<SessionDTO>;
  getUserById(userId: string): Promise<GetUserDTO | null>;
  getUserByEmail(email: string): Promise<GetUserDTO | null>;
  deleteUserById(id: string): Promise<GetUserDTO | null>;
  updateUserById(id: string, dto: UpdateUserDTO): Promise<GetUserDTO | null>;
  updateUserPassword(userId: string, dto: UpdatePasswordDTO): Promise<void>;
}
