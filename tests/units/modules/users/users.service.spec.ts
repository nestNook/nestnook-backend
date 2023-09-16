import { type RolesRepositoryInterface } from '@modules/roles/repositories/roles.repository.interface';
import { type UsersServiceInterface } from '@modules/users/services/users.service.interface';
import { SessionsService } from '@modules/session/services/sessions.service';
import { RolesRepositoryMock } from '../roles/mocks/roles-mock.repository';
import { BadRequestException } from '@src/errors/bad-request-exception';
import { UsersService } from '@modules/users/services/users.service';
import { ForbiddenException } from '@src/errors/forbidden-exception';
import { NotFoundException } from '@src/errors/not-found-exception';
import { UsersRepositoryMock } from './mocks/users-mock.repository';
import { UserBuilder } from '@modules/users/builders/user.builder';
import { sessionDTOMock } from '@test/__mocks__/sessions-mock';
import { PasswordUtils } from '@utils/password-utils';
import { adminRoleMock, roleMock } from '../roles/mocks/roles-mock';
import {
  createUserMock,
  givePrivilegesDTOMock,
  publicUserMock,
  updateUserMock,
  updateUserPasswordMock,
  userMock,
} from './mocks/users-mock';
import {
  type GetUserDTO,
  type User,
  type UserQuery,
} from '@modules/users/dtos';
import { ValidationUtils } from '@utils/validation-utils';
import { adminMock } from '@test/__mocks__/admin-user-mock';

describe('Users service', () => {
  let usersService: UsersServiceInterface;
  let usersRepository: UsersRepositoryMock;
  let rolesRepository: RolesRepositoryInterface;

  beforeEach(() => {
    rolesRepository = new RolesRepositoryMock();
    usersRepository = new UsersRepositoryMock();
    usersService = new UsersService(usersRepository, rolesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create user', () => {
    it('should be able to create a user', async () => {
      jest
        .spyOn(usersRepository, 'create')
        .mockReturnValueOnce(Promise.resolve(userMock));

      const hashPassSpy = jest.spyOn(PasswordUtils.prototype, 'hashPass');

      jest
        .spyOn(usersRepository, 'find')
        .mockReturnValueOnce(Promise.resolve(null));

      jest
        .spyOn(rolesRepository, 'getByName')
        .mockReturnValueOnce(Promise.resolve(roleMock));

      const sessionsServiceSpy = jest
        .spyOn(SessionsService.prototype, 'createSession')
        .mockReturnValueOnce(Promise.resolve(sessionDTOMock));

      const session = await usersService.createUser(createUserMock);

      expect(session).toEqual(sessionDTOMock);
      expect(session).toHaveProperty('access_token');
      expect(session).toHaveProperty('refresh_token');
      expect(hashPassSpy).toHaveBeenCalledWith(createUserMock.password);
      expect(sessionsServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should not be able to create a user with already existent email address', async () => {
      const error = new BadRequestException('Email already exists');
      jest
        .spyOn(usersRepository, 'find')
        .mockReturnValueOnce(Promise.resolve({ email: createUserMock.email }));

      const sessionsServiceSpy = jest.spyOn(
        SessionsService.prototype,
        'createSession',
      );

      await expect(usersService.createUser(createUserMock)).rejects.toThrow(
        error,
      );

      expect(sessionsServiceSpy).not.toHaveBeenCalled();
    });

    it('should not be able to create a user with already existent phone number', async () => {
      const error = new BadRequestException('Phone number already exists');
      jest
        .spyOn(usersRepository, 'find')
        .mockImplementation(async (dto: UserQuery) => {
          if (dto.phone_number) {
            return await Promise.resolve({
              phone_number: createUserMock.phone_number,
            });
          }
          return await Promise.resolve(null);
        });

      const sessionsServiceSpy = jest.spyOn(
        SessionsService.prototype,
        'createSession',
      );

      await expect(usersService.createUser(createUserMock)).rejects.toThrow(
        error,
      );

      expect(sessionsServiceSpy).not.toHaveBeenCalled();
    });

    it('should not be able to create a user with invalid body data', async () => {
      const createUserRepositorySpy = jest.spyOn(usersRepository, 'create');
      const validateSpy = jest.spyOn(ValidationUtils.prototype, 'validate');

      await expect(
        usersService.createUser({
          ...createUserMock,
          email: '123',
        }),
      ).rejects.toThrow(
        new BadRequestException('A valid email must be provided'),
      );

      await expect(
        usersService.createUser({
          ...createUserMock,
          phone_number: '123',
        }),
      ).rejects.toThrow(new BadRequestException('Invalid phone number'));

      await expect(
        usersService.createUser({
          ...createUserMock,
          password_confirm: '123',
        }),
      ).rejects.toThrow(new BadRequestException('Passwords does not match'));

      expect(createUserRepositorySpy).not.toHaveBeenCalled();
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    it('should not be able to create a user with non existent role', async () => {
      const createUserRepositorySpy = jest.spyOn(usersRepository, 'create');

      jest
        .spyOn(rolesRepository, 'getByName')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(usersService.createUser(createUserMock)).rejects.toThrow(
        new NotFoundException('Role not found'),
      );

      expect(createUserRepositorySpy).not.toHaveBeenCalled();
    });
  });

  describe('find user', () => {
    it('should be able to find a user by id', async () => {
      const findUserRepositorySpy = jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      const userBuilderSpy = jest.spyOn(UserBuilder, 'publicUser');
      const user = await usersService.getUserById(userMock.id);

      expect(findUserRepositorySpy).toHaveBeenCalledWith(userMock.id);
      expect(user).toEqual(publicUserMock);
      expect(userBuilderSpy).toBeCalledWith(userMock);
      expect(userBuilderSpy).toHaveReturnedWith(publicUserMock);
    });

    it('should be able to find a user by email', async () => {
      const findUserRepositorySpy = jest
        .spyOn(usersRepository, 'find')
        .mockReturnValueOnce(Promise.resolve(userMock));

      const userBuilderSpy = jest.spyOn(UserBuilder, 'publicUser');

      const user = await usersService.getUserByEmail(userMock.email);

      expect(findUserRepositorySpy).toHaveBeenCalledWith({
        email: userMock.email,
      });

      expect(user).toEqual(publicUserMock);
      expect(userBuilderSpy).toBeCalledWith(userMock);
      expect(userBuilderSpy).toHaveReturnedWith(publicUserMock);
    });

    it('should not be able to get a user with an id that does not exists', async () => {
      const error = new NotFoundException('User not found');

      const findUserRepositorySpy = jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(usersService.getUserById(userMock.id)).rejects.toThrow(
        error,
      );

      expect(findUserRepositorySpy).toHaveBeenCalledWith(userMock.id);
    });

    it('should not be able to get a user with an email that does not exists', async () => {
      const error = new NotFoundException('User not found');

      const findUserRepositorySpy = jest
        .spyOn(usersRepository, 'find')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(usersService.getUserByEmail(userMock.email)).rejects.toThrow(
        error,
      );

      expect(findUserRepositorySpy).toHaveBeenCalledWith({
        email: userMock.email,
      });
    });
  });

  describe('delete user', () => {
    it('should be able to delete a user by id', async () => {
      const deleteUserRepositorySpy = jest
        .spyOn(usersRepository, 'delete')
        .mockReturnValueOnce(Promise.resolve(userMock));

      const deletedUser = await usersService.deleteUserById(userMock.id);

      expect(deletedUser).toEqual(userMock);
      expect(deleteUserRepositorySpy).toHaveBeenCalledWith(userMock.id);
    });

    it('should not be able to delete a user that does not exists', async () => {
      const error = new NotFoundException('User not found');

      const deleteUserRepositorySpy = jest
        .spyOn(usersRepository, 'delete')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(usersService.deleteUserById(userMock.id)).rejects.toThrow(
        error,
      );

      expect(deleteUserRepositorySpy).toHaveBeenCalledWith(userMock.id);
    });
  });

  describe('update user', () => {
    it('should be able to update a user', async () => {
      const updatedUserMock: User = {
        ...userMock,
        ...updateUserMock,
      };

      const updatedPublicUserMock: GetUserDTO = {
        email: updatedUserMock.email,
        id: userMock.id,
        name: updatedUserMock.name,
        role: roleMock,
      };

      const updateUserRepositorySpy = jest
        .spyOn(usersRepository, 'update')
        .mockReturnValueOnce(Promise.resolve(updatedUserMock));

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(usersRepository, 'find')
        .mockReturnValue(Promise.resolve(null));

      const userBuilderSpy = jest.spyOn(UserBuilder, 'publicUser');

      const updatedUser = await usersService.updateUserById(
        userMock.id,
        updateUserMock,
      );

      expect(updateUserRepositorySpy).toHaveBeenCalledWith(
        userMock.id,
        updateUserMock,
      );
      expect(updatedUser).toEqual(updatedPublicUserMock);
      expect(userBuilderSpy).toBeCalledWith(updatedUserMock);
      expect(userBuilderSpy).toHaveReturnedWith(updatedPublicUserMock);
    });

    it('should not ne able to update a user that does not exists', async () => {
      const error = new NotFoundException('User not found');

      const updateUserRepositorySpy = jest
        .spyOn(usersRepository, 'update')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(
        usersService.updateUserById(userMock.id, updateUserMock),
      ).rejects.toThrow(error);

      expect(updateUserRepositorySpy).not.toHaveReturnedWith(null);
    });

    it('should not be able to update a user with already existent email address', async () => {
      const error = new BadRequestException('Email already exists');

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(usersRepository, 'find')
        .mockReturnValueOnce(Promise.resolve({ email: updateUserMock.email }));

      const updateUserRepositorySpy = jest.spyOn(usersRepository, 'update');
      await expect(
        usersService.updateUserById(userMock.id, updateUserMock),
      ).rejects.toThrow(error);

      expect(updateUserRepositorySpy).not.toHaveBeenCalled();
    });

    it('should not be able to update a user with already existent phone number', async () => {
      const error = new BadRequestException('Phone number already exists');

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(usersRepository, 'find')
        .mockImplementation(async (query: UserQuery) => {
          if (query.phone_number) {
            return await Promise.resolve({
              phone_number: updateUserMock.phone_number,
            });
          }
          return await Promise.resolve(null);
        });

      const updateUserRepositorySpy = jest.spyOn(usersRepository, 'update');
      await expect(
        usersService.updateUserById(userMock.id, updateUserMock),
      ).rejects.toThrow(error);

      expect(updateUserRepositorySpy).not.toHaveBeenCalled();
    });

    it('should bot be able to update a user with empty body', async () => {
      const error = new BadRequestException(
        'At least one field required to update',
      );

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(usersRepository, 'find')
        .mockReturnValue(Promise.resolve(null));

      await expect(
        usersService.updateUserById(userMock.id, {}),
      ).rejects.toThrow(error);

      const updateUserRepositorySpy = jest.spyOn(usersRepository, 'update');
      expect(updateUserRepositorySpy).not.toHaveBeenCalled();
    });
  });

  describe('update user password', () => {
    it('should be able to update a user password', async () => {
      const updateUserRepositorySpy = jest.spyOn(usersRepository, 'update');
      const passwordHashSpy = jest.spyOn(PasswordUtils.prototype, 'hashPass');

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(PasswordUtils.prototype, 'comparePass')
        .mockReturnValueOnce(Promise.resolve(true));

      await expect(
        usersService.updateUserPassword(userMock.id, updateUserPasswordMock),
      ).resolves.not.toThrow();
      expect(updateUserRepositorySpy).toHaveBeenCalled();
      expect(passwordHashSpy).toHaveBeenCalledWith(
        updateUserPasswordMock.password,
      );
    });

    it('should not be able to update a user password if he provides a wrong current password', async () => {
      const error = new ForbiddenException('Invalid current password');
      const updateUserRepositorySpy = jest.spyOn(usersRepository, 'update');

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(PasswordUtils.prototype, 'comparePass')
        .mockReturnValueOnce(Promise.resolve(false));

      await expect(
        usersService.updateUserPassword(userMock.id, updateUserPasswordMock),
      ).rejects.toThrow(error);

      expect(updateUserRepositorySpy).not.toHaveBeenCalled();
    });

    it('should not be able to update a user password if password and passwordConfirm fields does not match', async () => {
      const error = new BadRequestException('Passwords does not match');
      const updateUserRepositorySpy = jest.spyOn(usersRepository, 'update');

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(PasswordUtils.prototype, 'comparePass')
        .mockReturnValueOnce(Promise.resolve(true));

      await expect(
        usersService.updateUserPassword(userMock.id, {
          ...updateUserPasswordMock,
          passwordConfirm: '123',
        }),
      ).rejects.toThrow(error);

      expect(updateUserRepositorySpy).not.toHaveBeenCalled();
    });

    it('should not be able to update a password of a user that does not exists', async () => {
      const error = new NotFoundException('User not found');
      const updateUserRepositorySpy = jest.spyOn(usersRepository, 'update');

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(
        usersService.updateUserPassword(userMock.id, updateUserPasswordMock),
      ).rejects.toThrow(error);

      expect(updateUserRepositorySpy).not.toHaveBeenCalled();
    });
  });

  describe('give user privileges', () => {
    it('should be able to give privileges to a user', async () => {
      const updateUserRepositorySpy = jest
        .spyOn(usersRepository, 'update')
        .mockReturnValueOnce(Promise.resolve(adminMock));

      const userBuilderSpy = jest.spyOn(UserBuilder, 'publicUser');

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(rolesRepository, 'getByName')
        .mockReturnValueOnce(Promise.resolve(roleMock));

      const user = await usersService.givePrivileges(
        userMock,
        givePrivilegesDTOMock,
      );
      expect(user.role).toEqual(adminMock.role);
      expect(userBuilderSpy).toHaveBeenCalledWith(adminMock);
      expect(updateUserRepositorySpy).toHaveBeenCalledWith(
        givePrivilegesDTOMock.userId,
        {
          role_id: roleMock.id,
        },
      );
    });

    it('should not be able to the user to change their privileges', async () => {
      const updateUserRepositorySpy = jest
        .spyOn(usersRepository, 'update')
        .mockReturnValueOnce(Promise.resolve(adminMock));

      await expect(
        usersService.givePrivileges(
          {
            ...userMock,
            id: givePrivilegesDTOMock.userId,
          },
          givePrivilegesDTOMock,
        ),
      ).rejects.toThrow(
        new BadRequestException(
          'You are not allowed to give privileges to yourself',
        ),
      );

      expect(updateUserRepositorySpy).not.toHaveBeenCalled();
    });

    it('should not be able to give the same privilege that user already has', async () => {
      const updateUserRepositorySpy = jest.spyOn(usersRepository, 'update');

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve({ role: adminRoleMock }));

      await expect(
        usersService.givePrivileges(userMock, givePrivilegesDTOMock),
      ).rejects.toThrow(
        new BadRequestException(`User already is ${adminRoleMock.name}`),
      );

      expect(updateUserRepositorySpy).not.toHaveBeenCalled();
    });

    it('should not be able to give a privilege of a role that does not exist', async () => {
      const updateUserRepositorySpy = jest.spyOn(usersRepository, 'update');

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(rolesRepository, 'getByName')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(
        usersService.givePrivileges(userMock, givePrivilegesDTOMock),
      ).rejects.toThrow(new NotFoundException('Role not found'));

      expect(updateUserRepositorySpy).not.toHaveBeenCalled();
    });

    it('should not be able to give privileges to a user that does not exist', async () => {
      const updateUserRepositorySpy = jest
        .spyOn(usersRepository, 'update')
        .mockReturnValueOnce(Promise.resolve(null));

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(userMock));

      jest
        .spyOn(rolesRepository, 'getByName')
        .mockReturnValueOnce(Promise.resolve(adminRoleMock));

      await expect(
        usersService.givePrivileges(userMock, givePrivilegesDTOMock),
      ).rejects.toThrow(new NotFoundException('User not found'));

      expect(updateUserRepositorySpy).toHaveBeenCalledWith(
        givePrivilegesDTOMock.userId,
        {
          role_id: adminRoleMock.id,
        },
      );

      jest.clearAllMocks();

      updateUserRepositorySpy.mockReturnValueOnce(Promise.resolve(null));

      jest
        .spyOn(usersRepository, 'findById')
        .mockReturnValueOnce(Promise.resolve(null));

      await expect(
        usersService.givePrivileges(userMock, givePrivilegesDTOMock),
      ).rejects.toThrow(new NotFoundException('User not found'));
    });
  });
});
