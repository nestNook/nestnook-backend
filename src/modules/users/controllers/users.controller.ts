import { Controller } from '../../../common/controller.decorator';
import { UsersServiceInterface } from '../services/users.service.interface';
import { UsersControllerInterface } from './users.controller.interface';

@Controller
export class UsersController implements UsersControllerInterface {
  constructor(private readonly usersService: UsersServiceInterface) {}
}
