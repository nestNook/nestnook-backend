import { AuthServiceInterface } from './auth.service.interface';
import { AuthRepositoryInterface } from '../repositories/auth.repository.interface';

export class AuthService implements AuthServiceInterface {
  constructor(private readonly authRepository: AuthRepositoryInterface) {}
}
