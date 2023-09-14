import { type Role } from '@modules/roles/dtos';

export interface GetUserDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
}
