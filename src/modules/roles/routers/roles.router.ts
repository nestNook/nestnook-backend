import { type RolesControllerInterface } from '../controllers/roles.controller.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';
import { type Route } from '@common/route.interface';
import { UserRoles } from '@@types/user-roles';
import {
  type MiddlewaresOptions,
  type BaseRouter,
} from '@common/baseRouter.interface';
export class RolesRouter implements BaseRouter {
  routePrefix?: string | undefined = '/roles';
  routes: Route[];
  middlewaresOptions?: MiddlewaresOptions[] | undefined = [
    {
      middleware: auth(UserRoles.ADMIN),
    },
  ];

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
