import { UsersRepository } from '@modules/users/repositories/users.repository';
import { internCreateUserMock, userMock } from './mocks/users-mock';
import { mockPrisma } from '@test/__mocks__/prisma-mock';

describe('Users repository', () => {
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = new UsersRepository();
  });

  describe('Create user', () => {
    it('should be able to create a user', async () => {
      const createUserPrismaMock = mockPrisma.user.create.mockReturnValueOnce(
        Promise.resolve(userMock),
      );

      const user = await usersRepository.create(internCreateUserMock);

      expect(user).toEqual(userMock);
      expect(createUserPrismaMock).toBeCalledWith({
        data: internCreateUserMock,
        include: {
          role: true,
        },
      });
    });
  });
});
