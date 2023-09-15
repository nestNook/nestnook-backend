import { type Request, type Response } from 'express';
import { Controller } from '../../../common/controller.decorator';
import { type FabricatorsControllerInterface } from './fabricators.controller.interface';
import { type FabricatorServiceInterface } from '../services/fabricators.service.interface';
import { type CreateFabricatorDTO, type UpdateFabricatorDTO } from '../dtos';

@Controller
export class FabricatorsController implements FabricatorsControllerInterface {
  constructor(private readonly fabricatorService: FabricatorServiceInterface) {}

  async createFabricator(req: Request, res: Response): Promise<Response> {
    const createFabricatorDto: CreateFabricatorDTO = req.body;
    const fabricator =
      await this.fabricatorService.createFabricator(createFabricatorDto);

    return res.status(201).json({
      status: 'success',
      data: fabricator,
    });
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const fabricator = await this.fabricatorService.findById(id);

    return res.status(200).json({
      status: 'success',
      data: fabricator,
    });
  }

  async updateFabricator(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const fabricator: UpdateFabricatorDTO = req.body;
    const updatedFabricator = await this.fabricatorService.updateFabricator(
      id,
      fabricator,
    );

    return res.status(200).json({
      status: 'success',
      data: updatedFabricator,
    });
  }

  async deleteFabricator(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deletedFabricator = await this.fabricatorService.deleteFabricator(id);

    return res.status(200).json({
      status: 'success',
      data: deletedFabricator,
    });
  }
}
