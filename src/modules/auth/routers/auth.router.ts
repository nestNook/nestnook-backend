import { Route } from '@common/route.interface';
import { BaseRouter } from '@common/baseRouter.interface';
import { AuthControllerInterface } from '../controllers/auth.controller.interface';

export class AuthRouter implements BaseRouter {
  routePrefix?: string | undefined = '/auth';
  routes: Route[];

  constructor(readonly authController: AuthControllerInterface) {
    this.routes = [
      {
        path: '/sign-in',
        handler: authController.signIn,
        method: 'post',
      },
    ];
  }
}
