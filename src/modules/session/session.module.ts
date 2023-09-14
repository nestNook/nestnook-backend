import type { BaseModule } from '@common/baseModule';
import type { BaseRouter } from '@common/baseRouter.interface';
import { SessionsRouter } from './routers/sessions.router';
import { SessionsService } from './services/sessions.service';
import { SessionsController } from './controllers/sessions.controller';
import { SessionsRepository } from './repositories/sessions.repository';
import { type SessionsServiceInterface } from './services/sessions.service.interface';
import { type SessionsControllerInterface } from './controllers/sessions.controller.interface';
import { type SessionsRepositoryInterface } from './repositories/sessions.repository.interface';

export class SessionsModule implements BaseModule {
  router: BaseRouter;
  service: SessionsServiceInterface;
  repository: SessionsRepositoryInterface;
  controller: SessionsControllerInterface;

  constructor() {
    this.repository = new SessionsRepository();
    this.service = new SessionsService(this.repository);
    this.controller = new SessionsController(this.service);
    this.router = new SessionsRouter(this.controller);
  }
}

export default new SessionsModule();
