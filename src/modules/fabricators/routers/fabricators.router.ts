import { Route } from '../../../common/route.interface';
import { BaseRouter } from '../../../common/baseRouter.interface';
import { FabricatorsControllerInterface } from '../controllers/fabricators.controller.interface';

export class FabricatorsRouter implements BaseRouter {
  routePrefix?: string = '/fabricators';
  public routes: Route[] = [];

  constructor(
    readonly fabricatorsController: FabricatorsControllerInterface
  ) {
    this.routes = [
      {
        path: '/',
        handler: fabricatorsController.createFabricator,
        method: 'post',
        middlewares: [],
      },
      {
        path: '/:id',
        handler: fabricatorsController.updateFabricator,
        method: 'patch',
        middlewares: [],
      },
      {
        path: '/:id',
        handler: fabricatorsController.findById,
        method: 'get',
        middlewares: [],
      },
    ];
  }
}
