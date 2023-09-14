import { Route } from '@common/route.interface';
import { BaseRouter } from '@common/baseRouter.interface';
import { RolesControllerInterface } from '../controllers/roles.controller.interface';

export class RolesRouter implements BaseRouter {
  routePrefix?: string | undefined = '/roles';
  routes: Route[];

  constructor(readonly rolesController: RolesControllerInterface) {
    this.routes = [];
  }
}
