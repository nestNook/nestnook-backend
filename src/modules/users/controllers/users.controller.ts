import { Request, Response } from 'express';
import { CreateUserDTO } from '../dto/create-user.dto';
import { Controller } from '@common/controller.decorator';
import { UsersControllerInterface } from './users.controller.interface';
import { UsersServiceInterface } from '../services/users.service.interface';
import { CreateUserResDTO, UpdatePasswordDTO, UpdateUserDTO } from '../dto';

@Controller
export class UsersController implements UsersControllerInterface {
  constructor(private readonly usersService: UsersServiceInterface) {}

  async createUser(req: Request, res: Response): Promise<Response> {
    const userDto: CreateUserDTO = req.body;
    const tokens: CreateUserResDTO = await this.usersService.createUser(
      userDto
    );

    return res.status(201).json({
      status: 'success',
      data: tokens,
    });
  }

  async getMe(req: Request, res: Response): Promise<Response> {
    const userId: string = req.app.locals.user.id;

    const user = await this.usersService.getUserById(userId);

    return res.status(200).json({
      status: 'success',
      data: user,
    });
  }

  async deleteMe(req: Request, res: Response): Promise<Response> {
    const id: string = req.app.locals.user.id;

    await this.usersService.deleteUserById(id);

    return res.status(204).json();
  }

  async updateMe(req: Request, res: Response): Promise<Response> {
    const dto: UpdateUserDTO = req.body;
    const id: string = req.app.locals.user.id;

    const updatedUser = await this.usersService.updateUserById(id, dto);

    return res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
  }

  async updatePassword(req: Request, res: Response): Promise<Response> {
    const dto: UpdatePasswordDTO = req.body;
    const id: string = req.app.locals.user.id;

    await this.usersService.updateUserPassword(id, dto);

    return res.status(204).json();
  }
}
