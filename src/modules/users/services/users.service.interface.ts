import { SessionDTO } from '@@types/session.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { GetUserDTO } from '../dto';

export interface UsersServiceInterface {
  createUser(dto: CreateUserDTO): Promise<SessionDTO>;
  getUserById(userId: string): Promise<GetUserDTO | null>;
}
