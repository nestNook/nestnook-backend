import { ProductsRepository } from './repositories/products.repository';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductsRouter } from './routers/products.router';

export class ProductsModule {
  public repository: ProductsRepository;
  public service: ProductsService;
  public controller: ProductsController;
  public router: ProductsRouter;

  constructor() {
    this.repository = new ProductsRepository();
    this.service = new ProductsService(this.repository);
    this.controller = new ProductsController(this.service);
    this.router = new ProductsRouter(this.controller);
  }
}

export default new ProductsModule();
