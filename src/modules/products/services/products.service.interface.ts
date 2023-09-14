import { type CreateProductDTO } from '../dtos/create-product.dto';
import { type Product } from '../dtos/product.dto';

export interface ProductsServiceInterface {
  createProduct: (
    createProductDto: CreateProductDTO,
  ) => Promise<Product | null>;
}
