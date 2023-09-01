import { Route } from '../../../common/route.interface';
import { BaseRouter } from '../../../common/baseRouter.interface';
import { FabricatorsControllerInterface } from '../controllers/fabricators.controller.interface';

export class FabricatorsRouter implements BaseRouter {
  routePrefix?: string = '/fabricators';
  public routes: Route[] = [];

  constructor(
    private readonly fabricatorsController: FabricatorsControllerInterface
  ) {
    this.routes = [
      {
        path: '/',
        handler: this.fabricatorsController.createFabricator,
        method: 'post',
        middlewares: [],
      },
    ];
  }
}
