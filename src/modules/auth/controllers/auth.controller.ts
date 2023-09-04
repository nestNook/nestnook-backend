import { SessionDTO } from '@@types/session.dto';
import { SignInDTO } from '../dtos/sign-in.dto';
import { AuthServiceInterface } from '../services/auth.service.interface';
import { AuthControllerInterface } from './auth.controller.interface';
import { Controller } from '@common/controller.decorator';

@Controller
export class AuthController implements AuthControllerInterface {
  constructor(private readonly authService: AuthServiceInterface) {}

  async signIn(dto: SignInDTO): Promise<SessionDTO> {
    throw new Error('Method not implemented.');
  }
}
