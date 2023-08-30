import { prisma } from '../../../infra/database';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { ProductsRepositoryInterface } from './products.repository.interface';

export class ProductsRepository implements ProductsRepositoryInterface {
  async createProduct(productDto: CreateProductDTO): Promise<CreateProductDTO | null> {
    const product = await prisma.product.create({data: productDto})
    return product
  }
}
