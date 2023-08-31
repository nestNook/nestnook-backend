import { CreateSectorDTO } from '../dtos';
import { Request, Response, NextFunction } from 'express';
import { SectorServiceInterface } from '../services/sector.service.interface';
import { SectorControllerInterface } from './sector.controller.interface';
import { Controller } from '../../../common/controller.decorator';

@Controller
export class SectorController implements SectorControllerInterface {
  constructor(private readonly sectorService: SectorServiceInterface) {}

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const createSectorDto: CreateSectorDTO = req.body;
    const sector = await this.sectorService.createSector(createSectorDto);

    return res.status(201).json({
      status: 'success',
      data: sector,
    });
  }
}
