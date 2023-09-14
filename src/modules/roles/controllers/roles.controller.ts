import { RolesServiceInterface } from '../services/roles.service.interface';
import { RolesControllerInterface } from './roles.controller.interface';
import { Controller } from '@common/controller.decorator';

@Controller
export class RolesController implements RolesControllerInterface {
  constructor(private readonly rolesService: RolesServiceInterface) {}
}