import { Route } from '@common/route.interface';
import { BaseRouter } from '@common/baseRouter.interface';
import { SessionsControllerInterface } from '../controllers/sessions.controller.interface';

export class SessionsRouter implements BaseRouter {
  routePrefix?: string | undefined = '/sessions';
  routes: Route[];

  constructor(readonly sessionsController: SessionsControllerInterface) {
    this.routes = [
      {
        method: 'get',
        handler: sessionsController.getUserSessions,
        path: '/',
        middlewares: [],
      },
      {
        method: 'post',
        handler: sessionsController.createSession,
        path: '/',
        middlewares: [],
      },
    ];
  }
}
