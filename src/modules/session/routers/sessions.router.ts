import { type SessionsControllerInterface } from '../controllers/sessions.controller.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';
import { type Route } from '@common/route.interface';
import {
  type MiddlewaresOptions,
  type BaseRouter,
} from '@common/baseRouter.interface';

export class SessionsRouter implements BaseRouter {
  routePrefix?: string | undefined = '/sessions';
  routes: Route[];
  middlewaresOptions?: MiddlewaresOptions[] = [
    {
      middleware: auth(),
    },
  ];

  constructor(readonly sessionsController: SessionsControllerInterface) {
    this.routes = [
      {
        method: 'get',
        handler: sessionsController.getUserSessions,
        path: '/',
      },
      {
        method: 'post',
        handler: sessionsController.createSession,
        path: '/',
      },
      {
        method: 'delete',
        handler: sessionsController.deleteSession,
        path: '/:id',
      },
    ];
  }
}
