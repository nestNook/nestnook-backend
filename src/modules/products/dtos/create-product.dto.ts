export interface CreateProductDTO {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  currency: string;
  sector_id: string;
  fabricator_id: string;
}