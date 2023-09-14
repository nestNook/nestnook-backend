import { type BaseModule } from '@common/baseModule';
import { type BaseRouter } from '@common/baseRouter.interface';

import { AuthRouter } from './routers/auth.router';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { SessionsRepository } from '@modules/session/repositories/sessions.repository';
import { SessionsService } from '@modules/session/services/sessions.service';

export class AuthModule implements BaseModule {
  public router: BaseRouter;
  public service: AuthService;
  public controller: AuthController;
  public repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
    this.service = new AuthService(
      this.repository,
      new SessionsService(new SessionsRepository()),
    );
    this.controller = new AuthController(this.service);
    this.router = new AuthRouter(this.controller);
  }
}

export default new AuthModule();
