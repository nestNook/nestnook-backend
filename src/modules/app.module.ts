import Auth from './auth/auth.module';
import UsersModule from './users/users.module';
import SectorModule from './sectors/sector.module';
import ProductsModule from './products/products.module';
import FabricatorsModule from './fabricators/fabricators.module';
import AddressModule from './address/address.module';
import SessionModule from './session/session.module';

import { BaseModule } from '../common/baseModule';
import { BaseRouter } from '../common/baseRouter.interface';

export class AppModule {
  public readonly routers: BaseRouter[];

  constructor(...modules: BaseModule[]) {
    this.routers = modules.map((module) => module.router);
  }
}

export default new AppModule(
  Auth,
  ProductsModule,
  SectorModule,
  FabricatorsModule,
  UsersModule,
  AddressModule,
  SessionModule
);
