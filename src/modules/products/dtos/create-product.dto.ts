export interface CreateProductDTO {
  sku: string;
  name: string;
  description: string;
  category: string;
  price: bigint;
  quantity: number;
  currency: string;
  sector_id: string;
  fabricator_id: string;
}