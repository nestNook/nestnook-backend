import { Request, Response } from 'express';
import { Controller } from '../../../common/controller.decorator';
import { FabricatorsControllerInterface } from './fabricators.controller.interface';
import { FabricatorServiceInterface } from '../services/fabricators.service.interface';
import { CreateFabricatorDTO, UpdateFabricatorDTO } from '../dtos';

@Controller
export class FabricatorsController implements FabricatorsControllerInterface {
  constructor(private readonly fabricatorService: FabricatorServiceInterface) {}

  async createFabricator(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const createFabricatorDto: CreateFabricatorDTO = req.body;
    const fabricator = await this.fabricatorService.createFabricator(
      createFabricatorDto
    );

    return res.status(201).json({
      status: 'success',
      data: fabricator,
    });
  }

  async find(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { email } = req.body;
    const fabricator = await this.fabricatorService.find(email);

    return res.status(200).json({
      status: 'success',
      data: fabricator,
    });
  }

  async findById(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { id } = req.params;
    const fabricator = await this.fabricatorService.findById(id);

    return res.status(200).json({
      status: 'success',
      data: fabricator,
    });
  }

  async updateFabricator(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { id } = req.params;
    const fabricator: UpdateFabricatorDTO = req.body;
    const updatedFabricator = await this.fabricatorService.updateFabricator(
      id,
      fabricator
    );

    return res.status(200).json({
      status: 'success',
      data: updatedFabricator,
    });
  }

  async deleteFabricator(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { id } = req.params;
    await this.fabricatorService.deleteFabricator(id);

    return res.status(204).json();
  }
}
