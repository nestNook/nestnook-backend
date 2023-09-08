export interface Address {
  id: string;
  user_id: string | null;
  fabricator_id: string | null;
  postal_code: string;
  country: string;
  street: string;
  state: string;
  city: string;
  neighborhood: string;
  created_at: Date;
  updated_at: Date;
}
