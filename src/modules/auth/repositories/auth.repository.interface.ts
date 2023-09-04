import { User } from '@modules/users/dto';

export interface AuthRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
}
