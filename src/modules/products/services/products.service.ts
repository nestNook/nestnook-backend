import { ProductsRepositoryInterface } from '../repositories/products.repository.interface';
import { ProductsServiceInterface } from './products.service.interface';

export class ProductsService implements ProductsServiceInterface {
  constructor(
    private readonly productsRepository: ProductsRepositoryInterface
  ) {}
}
