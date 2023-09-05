import { Route } from '@common/route.interface';
import { BaseRouter } from '@common/baseRouter.interface';
import { UsersControllerInterface } from '../controllers/users.controller.interface';

export class UsersRouter implements BaseRouter {
  routePrefix?: string | undefined = '/users';
  routes: Route[];

  constructor(usersController: UsersControllerInterface) {
    this.routes = [
      {
        method: 'post',
        handler: usersController.createUser,
        path: '/',
        middlewares: [],
      },
      {
        method: 'get',
        handler: usersController.getMe,
        path: '/',
        middlewares: [],
      },
      {
        method: 'patch',
        handler: usersController.updateMe,
        path: '/',
        middlewares: [],
      },
      {
        method: 'patch',
        handler: usersController.updatePassword,
        path: '/update-password',
        middlewares: [],
      },
      {
        method: 'delete',
        handler: usersController.deleteMe,
        path: '/',
        middlewares: [],
      },
    ];
  }
}
