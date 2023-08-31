import { CreateProductDTO } from "../../../../../src/modules/products/dtos/create-product.dto";
import { Product } from "../../../../../src/modules/products/dtos/product.dto";


export const createProductMock: CreateProductDTO  = {
  sku: '1234',
  name: 'Ball',
  description: 'A Ball',
  category: 'Toy',
  price: BigInt(1234),
  quantity: 123,
  currency: '1',
  sector_id: '1',
  fabricator_id: '1'
}

export const productMock: Product  = {
  id: '1',
  sku: '1234',
  name: 'Ball',
  description: 'A Ball',
  category: 'Toy',
  price: BigInt(1234),
  quantity: 123,
  currency: '1',
  sector_id: '1',
  fabricator_id: '1',
  created_at: new Date(),
  updated_at: new Date()
}