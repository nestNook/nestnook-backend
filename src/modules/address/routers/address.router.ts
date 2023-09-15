import { type AddressControllerInterface } from '../controllers/address.controller.interface';
import { auth } from '@modules/auth/middlewares/auth.middleware';
import { type Route } from '@common/route.interface';
import {
  type MiddlewaresOptions,
  type BaseRouter,
} from '@common/baseRouter.interface';

export class AddressRouter implements BaseRouter {
  routePrefix?: string | undefined = '/address';
  public routes: Route[] = [];
  middlewaresOptions?: MiddlewaresOptions[] | undefined = [
    {
      middleware: auth(),
    },
  ];

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
