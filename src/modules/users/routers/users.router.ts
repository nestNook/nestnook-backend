import { type UsersControllerInterface } from '../controllers/users.controller.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';
import { type Route } from '@common/route.interface';
import {
  type MiddlewaresOptions,
  type BaseRouter,
} from '@common/baseRouter.interface';

export class UsersRouter implements BaseRouter {
  routePrefix?: string | undefined = '/users';
  routes: Route[];
  middlewaresOptions?: MiddlewaresOptions[] = [
    {
      middleware: auth(),
      exclude: [
        {
          method: 'post',
          path: '/',
        },
      ],
    },
  ];

  constructor(usersController: UsersControllerInterface) {
    this.routes = [
      {
        method: 'post',
        handler: usersController.createUser,
        path: '/',
      },
      {
        method: 'get',
        handler: usersController.getMe,
        path: '/',
      },
      {
        method: 'patch',
        handler: usersController.updateMe,
        path: '/',
      },
      {
        method: 'patch',
        handler: usersController.updatePassword,
        path: '/update-password',
      },
      {
        method: 'delete',
        handler: usersController.deleteMe,
        path: '/',
      },
    ];
  }
}
