import { SessionDTO } from '@@types/session.dto';
import { SignInDTO } from '../dtos/sign-in.dto';
import { AuthServiceInterface } from '../services/auth.service.interface';
import { AuthControllerInterface } from './auth.controller.interface';
import { Controller } from '@common/controller.decorator';
import { Request, Response } from 'express';
import cookieUtils from '@utils/cookie-utils';

@Controller
export class AuthController implements AuthControllerInterface {
  constructor(private readonly authService: AuthServiceInterface) {}

  async signIn(req: Request, res: Response): Promise<Response> {
    const dto: SignInDTO = req.body;
    const session: SessionDTO = await this.authService.login(dto);

    cookieUtils.accessToken(session.access_token, res);
    cookieUtils.refreshToken(session.refresh_token, res);

    return res.status(200).json({
      status: 'success',
      data: session,
    });
  }
}
