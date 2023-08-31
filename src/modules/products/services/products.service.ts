import { prisma } from '../../../infra/database';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { Product } from '../dtos/product.dto';
import { ProductsRepositoryInterface } from '../repositories/products.repository.interface';
import { ProductsServiceInterface } from './products.service.interface';

export class ProductsService implements ProductsServiceInterface {
  constructor(
    private readonly productsRepository: ProductsRepositoryInterface
  ) {}

  async createProduct(
    createProductDto: CreateProductDTO
  ): Promise<Product | null> {
    const product = await this.productsRepository.createProduct(
      createProductDto
    );
    return product;
  }
}
