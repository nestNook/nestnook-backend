import { Route } from '../../../common/route.interface';
import { BaseRouter } from '../../../common/baseRouter.interface';
import { ProductsControllerInterface } from '../controllers/products.controller.interface';

export class ProductsRouter implements BaseRouter {
  routePrefix?: string = '/products';
  public routes: Route[] = [];

  constructor(
    private readonly productsController: ProductsControllerInterface
  ) {
    this.routes = [
      {
        path: '/',
        handler: this.productsController.createProduct,
        method: 'post',
        middlewares: [],
      },
    ];
  }
}
