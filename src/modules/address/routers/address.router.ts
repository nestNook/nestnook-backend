import { BaseRouter } from '../../../common/baseRouter.interface';
import { Route } from '../../../common/route.interface';
import { AddressControllerInterface } from '../controllers/address.controller.interface';

export class AddressRouter implements BaseRouter {
  routePrefix?: string | undefined = '/address';
  public routes: Route[] = [];

  constructor(readonly addressController: AddressControllerInterface) {
    this.routes = [
      {
        path: '/',
        handler: addressController.createAddress,
        method: 'post',
        middlewares: [],
      },
    ];
  }
}
