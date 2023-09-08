import { AddressControllerInterface } from '../controllers/address.controller.interface';
import { BaseRouter } from '@common/baseRouter.interface';
import { Route } from '@common/route.interface';

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
      {
        path: '/:id',
        handler: addressController.getAddressById,
        method: 'get',
        middlewares: [],
      },
      {
        path: '/',
        handler: addressController.getUserAddresses,
        method: 'get',
        middlewares: [],
      },
      {
        path: '/:id',
        handler: addressController.updateAddress,
        method: 'patch',
        middlewares: [],
      },
      {
        path: '/:id',
        handler: addressController.deleteAddress,
        method: 'delete',
        middlewares: [],
      },
    ];
  }
}
