import { CreateUserDTO } from '../dto/create-user.dto';
import { CreateUserResDTO } from '../dto';

export interface UsersServiceInterface {
  createUser(dto: CreateUserDTO): Promise<CreateUserResDTO>;
}
