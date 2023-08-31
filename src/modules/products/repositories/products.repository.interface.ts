import { CreateProductDTO } from "../dtos/create-product.dto";
import { Product } from "../dtos/product.dto";

export interface ProductsRepositoryInterface {
  createProduct(createProductData: CreateProductDTO): Promise<Product | null>;
}
