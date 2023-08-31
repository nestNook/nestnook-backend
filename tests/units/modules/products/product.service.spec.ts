import { ProductsService } from '../../../../src/modules/products/services/products.service';
import { ProductsServiceInterface } from '../../../../src/modules/products/services/products.service.interface';
import { ProductsRepository } from '../../../../src/modules/products/repositories/products.repository';
import { mockPrisma } from '../../../__mocks__/prisma-mock';
import { createProductMock, productMock } from './mocks/product-mock';

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
