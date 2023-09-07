import { ProductsServiceInterface } from '@modules/products/services/products.service.interface';
import { ProductsRepository } from '@modules/products/repositories/products.repository';
import { ProductsService } from '@modules/products/services/products.service';
import { createProductMock, productMock } from './mocks/product-mock';
import { mockPrisma } from '@test/__mocks__/prisma-mock';

describe('Product services', () => {
  let productsService: ProductsServiceInterface;
  const productsRepository = new ProductsRepository();

  beforeEach(() => {
    productsService = new ProductsService(productsRepository);
  });

  it('should be able to create a product', async () => {
    const createProductSpy = mockPrisma.product.create.mockReturnValueOnce(
      Promise.resolve(productMock)
    );

    const product = await productsService.createProduct(createProductMock);
    expect(product).toEqual(productMock);
    expect(createProductSpy).toHaveBeenCalledWith({ data: createProductMock });
  });
});
