import { type Route } from '../../../common/route.interface';
import {
  MiddlewaresOptions,
  type BaseRouter,
} from '../../../common/baseRouter.interface';
import { type SectorControllerInterface } from '../controllers/sector.controller.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';
import { AccessLevel } from '@@types/access-level';

export class SectorRouter implements BaseRouter {
  routePrefix?: string | undefined = '/sectors';
  routes: Route[];
  middlewaresOptions?: MiddlewaresOptions[] = [
    {
      middleware: auth(AccessLevel.ADMIN),
    },
  ];

  constructor(readonly sectorController: SectorControllerInterface) {
    this.routes = [
      {
        path: '/',
        handler: sectorController.createSector,
        method: 'post',
      },
      {
        path: '/:id',
        handler: sectorController.updateSector,
        method: 'patch',
      },
      {
        path: '/:id',
        handler: sectorController.findById,
        method: 'get',
      },
      {
        path: '/:id',
        handler: sectorController.deleteSector,
        method: 'delete',
      },
    ];
  }
}
