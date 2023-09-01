import { CreateUserResDTO } from '../dto';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../dto/create-user.dto';
import { Controller } from '@common/controller.decorator';
import { UsersControllerInterface } from './users.controller.interface';
import { UsersServiceInterface } from '../services/users.service.interface';

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
}
