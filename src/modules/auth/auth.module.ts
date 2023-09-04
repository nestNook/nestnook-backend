import { BaseModule } from '@common/baseModule';
import { BaseRouter } from '@common/baseRouter.interface';

import { AuthRouter } from './routers/auth.router';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';

export class AuthModule implements BaseModule {
  public router: BaseRouter;
  public service: AuthService;
  public controller: AuthController;
  public repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
    this.service = new AuthService(this.repository);
    this.controller = new AuthController(this.service);
    this.router = new AuthRouter(this.controller);
  }
}

export default new AuthModule();