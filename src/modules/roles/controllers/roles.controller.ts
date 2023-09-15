import { type RolesServiceInterface } from '../services/roles.service.interface';
import { type RolesControllerInterface } from './roles.controller.interface';
import { Controller } from '@common/controller.decorator';
import { type CreateRoleDTO, type UpdateRoleDTO } from '../dtos';
import { type Request, type Response } from 'express';

@Controller
export class RolesController implements RolesControllerInterface {
  constructor(private readonly rolesService: RolesServiceInterface) {}

  async createRole(req: Request, res: Response): Promise<Response> {
    const dto: CreateRoleDTO = req.body;
    const role = await this.rolesService.createRole(dto);

    return res.status(201).json({
      status: 'success',
      data: role,
    });
  }

  async getRoleById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const role = await this.rolesService.getRoleById(id);

    return res.status(200).json({
      status: 'success',
      data: role,
    });
  }

  async listRoles(req: Request, res: Response): Promise<Response> {
    const roles = await this.rolesService.getAllRoles();

    return res.status(200).json({
      status: 'success',
      results: roles.length,
      data: roles,
    });
  }

  async deleteRole(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const role = await this.rolesService.deleteRole(id);

    return res.status(200).json({
      status: 'success',
      data: role,
    });
  }

  async updateRole(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const dto: UpdateRoleDTO = req.body;
    const role = await this.rolesService.updateRole(id, dto);

    return res.status(200).json({
      status: 'success',
      data: role,
    });
  }
}
