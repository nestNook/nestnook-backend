import { AddressControllerInterface } from '../controllers/address.controller.interface';
import { BaseRouter } from '@common/baseRouter.interface';
import { Handler, Route } from '@common/route.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';

export class AddressRouter implements BaseRouter {
  routePrefix?: string | undefined = '/address';
  middlewares?: Handler[] = [auth()];
  public routes: Route[] = [];

  constructor(readonly addressController: AddressControllerInterface) {
    this.routes = [
      {
        path: '/',
        handler: addressController.createAddress,
        method: 'post',
      },
      {
        path: '/:id',
        handler: addressController.getAddressById,
        method: 'get',
      },
      {
        path: '/',
        handler: addressController.getUserAddresses,
        method: 'get',
      },
      {
        path: '/:id',
        handler: addressController.updateAddress,
        method: 'patch',
      },
      {
        path: '/:id',
        handler: addressController.deleteAddress,
        method: 'delete',
      },
    ];
  }
}
