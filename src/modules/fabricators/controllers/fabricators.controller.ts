import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../../common/controller.decorator';
import { FabricatorsControllerInterface } from './fabricators.controller.interface';
import { FabricatorServiceInterface } from '../services/fabricators.service.interface';

@Controller
export class FabricatorsController implements FabricatorsControllerInterface {
  constructor(private readonly fabricatorService: FabricatorServiceInterface) {}

  async createFabricator(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const fabricator = await this.fabricatorService.createFabricator(req.body);

    return res.status(201).json({
      status: 'success',
      data: fabricator,
    });
  }
}
