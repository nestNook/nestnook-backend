import { BaseRouter } from '../common/baseRouter.interface';
import ProductsModule from './products/products.module';

export class AppModule {
  public routers: BaseRouter[];

  constructor(routers: BaseRouter[]) {
    this.routers = routers;
  }
}

export default new AppModule([ProductsModule.router]);
