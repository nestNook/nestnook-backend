import { type Role } from '@modules/roles/dtos';

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  phone_number: string;
  email_verified: boolean;
  otp_enabled: boolean | null;
  otp_secret: string | null;
  google_id: string | null;
  profile_pic_id: string | null;
  created_at: Date;
  updated_at: Date;
  role: Role;
}
