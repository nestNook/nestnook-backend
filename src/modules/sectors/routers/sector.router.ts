import { Route } from '../../../common/route.interface';
import { BaseRouter } from '../../../common/baseRouter.interface';
import { SectorControllerInterface } from '../controllers/sector.controller.interface';

export class SectorRouter implements BaseRouter {
  routePrefix?: string | undefined = '/sectors';
  routes: Route[];

  constructor(readonly sectorController: SectorControllerInterface) {
    this.routes = [
      {
        path: '/',
        handler: sectorController.createSector,
        method: 'post',
        middlewares: [],
      },
    ];
  }
}
