import { type Route } from '@common/route.interface';
import { type BaseRouter } from '@common/baseRouter.interface';
import { type UsersControllerInterface } from '../controllers/users.controller.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';

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
        middlewares: [auth()],
      },
      {
        method: 'patch',
        handler: usersController.updateMe,
        path: '/',
        middlewares: [auth()],
      },
      {
        method: 'patch',
        handler: usersController.updatePassword,
        path: '/update-password',
        middlewares: [auth()],
      },
      {
        method: 'delete',
        handler: usersController.deleteMe,
        path: '/',
        middlewares: [auth()],
      },
    ];
  }
}
