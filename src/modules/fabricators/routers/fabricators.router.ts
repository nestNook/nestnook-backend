import { type Route } from '../../../common/route.interface';
import { type BaseRouter } from '../../../common/baseRouter.interface';
import { type FabricatorsControllerInterface } from '../controllers/fabricators.controller.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';
import { UserRoles } from '@@types/user-roles';

export class FabricatorsRouter implements BaseRouter {
  routePrefix?: string = '/fabricators';
  public routes: Route[] = [];

  constructor(readonly fabricatorsController: FabricatorsControllerInterface) {
    this.routes = [
      {
        path: '/',
        handler: fabricatorsController.createFabricator,
        method: 'post',
        middlewares: [auth(UserRoles.ADMIN)],
      },
      {
        path: '/:id',
        handler: fabricatorsController.updateFabricator,
        method: 'patch',
        middlewares: [auth(UserRoles.ADMIN)],
      },
      {
        path: '/:id',
        handler: fabricatorsController.findById,
        method: 'get',
        middlewares: [],
      },
      {
        path: '/:id',
        handler: fabricatorsController.deleteFabricator,
        method: 'delete',
        middlewares: [auth(UserRoles.ADMIN)],
      },
    ];
  }
}
