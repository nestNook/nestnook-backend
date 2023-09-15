import { type UserRoles } from '@@types/user-roles';

export interface GivePrivilegesDTO {
  userId: string;
  privilege: UserRoles;
}
