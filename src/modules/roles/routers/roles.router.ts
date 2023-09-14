import { type RolesControllerInterface } from '../controllers/roles.controller.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';
import { type BaseRouter } from '@common/baseRouter.interface';
import { type Handler, type Route } from '@common/route.interface';
import { UserRoles } from '@@types/user-roles';
export class RolesRouter implements BaseRouter {
  routePrefix?: string | undefined = '/roles';
  routes: Route[];
  middlewares?: Handler[] | undefined = [auth(UserRoles.ADMIN)];

  constructor(readonly rolesController: RolesControllerInterface) {
    this.routes = [
      {
        method: 'post',
        handler: rolesController.createRole,
        path: '/',
        middlewares: [],
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
