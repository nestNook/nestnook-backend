import { ProductsRepository } from '../../../../src/modules/products/repositories/products.repository';
import { ProductsRepositoryInterface } from '../../../../src/modules/products/repositories/products.repository.interface';
import { mockPrisma } from '../../../__mocks__/prisma-mock';
import { createProductMock, productMock } from './mocks/product-mock';

describe('Products Repository', () => {
  let productsRepository: ProductsRepositoryInterface;

  beforeEach(() => {
    productsRepository = new ProductsRepository();
  });

  it('should be able to create a product', async () => {
    const createProductSpy = mockPrisma.product.create.mockReturnValueOnce(
      Promise.resolve(productMock)
    );

    const product = await productsRepository.createProduct(createProductMock);
    expect(product).toEqual(productMock);
    expect(createProductSpy).toHaveBeenCalledWith({ data: createProductMock });
  });

  it('should return a error when try to create a product with already existent name', async () => {
    const error = new Error('Product name already exists');

    mockPrisma.product.create.mockReturnValueOnce(Promise.reject(error));

    await expect(async () => {
      await productsRepository.createProduct(createProductMock);
    }).rejects.toThrow(error);
  });
});
