import { type CreateProductDTO } from '../dtos/create-product.dto';
import { type Product } from '../dtos/product.dto';

export interface ProductsRepositoryInterface {
  createProduct: (
    createProductData: CreateProductDTO,
  ) => Promise<Product | null>;
}
