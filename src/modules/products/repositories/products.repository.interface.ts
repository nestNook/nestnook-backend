import { CreateProductDTO } from "../dtos/create-product.dto";

export interface ProductsRepositoryInterface {
  createProduct(createProductData: CreateProductDTO): Promise<CreateProductDTO | null>;
}
