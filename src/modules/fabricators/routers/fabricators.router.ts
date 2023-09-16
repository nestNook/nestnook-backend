import { type Route } from '../../../common/route.interface';
import {
  MiddlewaresOptions,
  type BaseRouter,
} from '../../../common/baseRouter.interface';
import { type FabricatorsControllerInterface } from '../controllers/fabricators.controller.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';
import { UserRoles } from '@@types/user-roles';
import { AccessLevel } from '@@types/access-level';

export class FabricatorsRouter implements BaseRouter {
  routePrefix?: string = '/fabricators';
  public routes: Route[] = [];
  middlewaresOptions?: MiddlewaresOptions[] | undefined = [
    {
      middleware: auth(AccessLevel.ADMIN),
      exclude: [
        {
          path: '/:id',
          method: 'get',
        },
      ],
    },
  ];
  constructor(readonly fabricatorsController: FabricatorsControllerInterface) {
    this.routes = [
      {
        path: '/',
        handler: fabricatorsController.createFabricator,
        method: 'post',
      },
      {
        path: '/:id',
        handler: fabricatorsController.updateFabricator,
        method: 'patch',
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
      },
    ];
  }
}
