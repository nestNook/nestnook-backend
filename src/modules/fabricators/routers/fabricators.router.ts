import { type Route } from '../../../common/route.interface';
import { type BaseRouter } from '../../../common/baseRouter.interface';
import { type FabricatorsControllerInterface } from '../controllers/fabricators.controller.interface';

export class FabricatorsRouter implements BaseRouter {
  routePrefix?: string = '/fabricators';
  public routes: Route[] = [];

  constructor(readonly fabricatorsController: FabricatorsControllerInterface) {
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
