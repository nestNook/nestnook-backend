export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  price: bigint;
  quantity: number;
  currency: string;
  sector_id: string;
  fabricator_id: string;
  created_at: Date;
  updated_at: Date;
}
