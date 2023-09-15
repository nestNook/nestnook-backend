import { type GetUserDTO, type User } from '../dtos';

export class UserBuilder {
  static publicUser({ email, id, name, role }: User): GetUserDTO {
    const publicUser: GetUserDTO = {
      email,
      id,
      name,
      role,
    };

    return publicUser;
  }
}
