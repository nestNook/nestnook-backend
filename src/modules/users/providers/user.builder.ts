import { GetUserDTO, User } from '../dto';

export class UserBuilder {
  static publicUser({ email, id, name }: User): GetUserDTO {
    const publicUser: GetUserDTO = {
      email,
      id,
      name,
    };

    return publicUser;
  }
}
