import { type BaseModule } from '@common/baseModule';
import { type BaseRouter } from '@common/baseRouter.interface';

import { RolesRouter } from './routers/roles.router';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { RolesRepository } from './repositories/roles.repository';
import { UsersRepository } from '@modules/users/repositories/users.repository';

export class RolesModule implements BaseModule {
  public router: BaseRouter;
  public service: RolesService;
  public controller: RolesController;
  public repository: RolesRepository;

  constructor() {
    this.repository = new RolesRepository();
    this.service = new RolesService(this.repository, new UsersRepository());
    this.controller = new RolesController(this.service);
    this.router = new RolesRouter(this.controller);
  }
}

export default new RolesModule();
