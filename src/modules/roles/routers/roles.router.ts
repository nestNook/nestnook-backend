import { RolesControllerInterface } from '../controllers/roles.controller.interface';
import { BaseRouter } from '@common/baseRouter.interface';
import { Route } from '@common/route.interface';

export class RolesRouter implements BaseRouter {
  routePrefix?: string | undefined = '/roles';
  routes: Route[];

  constructor(readonly rolesController: RolesControllerInterface) {
    this.routes = [
      {
        method: 'post',
        handler: rolesController.createRole,
        path: '/',
      },
      {
        method: 'get',
        handler: rolesController.getRoleById,
        path: '/:id',
      },
      {
        method: 'get',
        handler: rolesController.listRoles,
        path: '/',
      },
      {
        method: 'patch',
        handler: rolesController.updateRole,
        path: '/:id',
      },
      {
        method: 'delete',
        handler: rolesController.deleteRole,
        path: '/:id',
      },
    ];
  }
}
