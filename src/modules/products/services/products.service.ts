import { type CreateProductDTO } from '../dtos/create-product.dto';
import { type Product } from '../dtos/product.dto';
import { type ProductsRepositoryInterface } from '../repositories/products.repository.interface';
import { type ProductsServiceInterface } from './products.service.interface';

export class ProductsService implements ProductsServiceInterface {
  constructor(
    private readonly productsRepository: ProductsRepositoryInterface,
  ) {}

  async createProduct(
    createProductDto: CreateProductDTO,
  ): Promise<Product | null> {
    const product =
      await this.productsRepository.createProduct(createProductDto);
    return product;
  }
}
