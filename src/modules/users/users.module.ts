import { BaseModule } from '@common/baseModule';
import { UsersRouter } from './routers/users.router';
import { UsersService } from './services/users.service';
import { BaseRouter } from '@common/baseRouter.interface';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersServiceInterface } from './services/users.service.interface';
import { UsersControllerInterface } from './controllers/users.controller.interface';
import { UsersRepositoryInterface } from './repositories/users.repository.interface';
import rolesModule from '@modules/roles/roles.module';

export class UsersModule implements BaseModule {
  router: BaseRouter;
  controller: UsersControllerInterface;
  service: UsersServiceInterface;
  repository: UsersRepositoryInterface;

  constructor() {
    this.repository = new UsersRepository();
    this.service = new UsersService(this.repository, rolesModule.repository);
    this.controller = new UsersController(this.service);
    this.router = new UsersRouter(this.controller);
  }
}

export default new UsersModule();
