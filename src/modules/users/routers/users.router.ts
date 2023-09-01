import { BaseRouter } from '../../../common/baseRouter.interface';
import { Route } from '../../../common/route.interface';
import { UsersControllerInterface } from '../controllers/users.controller.interface';

export class UsersRouter implements BaseRouter {
  routePrefix?: string | undefined;
  routes: Route[];

  constructor(usersController: UsersControllerInterface) {
    this.routes = [];
  }
}
