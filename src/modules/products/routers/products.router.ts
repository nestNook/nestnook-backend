import { type Route } from '../../../common/route.interface';
import { type BaseRouter } from '../../../common/baseRouter.interface';
import { type ProductsControllerInterface } from '../controllers/products.controller.interface';

export class ProductsRouter implements BaseRouter {
  routePrefix?: string = '/products';
  public routes: Route[] = [];

  constructor(
    private readonly productsController: ProductsControllerInterface,
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
