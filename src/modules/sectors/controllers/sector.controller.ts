import { type CreateSectorDTO } from '../dtos';
import { type Request, type Response, type NextFunction } from 'express';
import { type SectorServiceInterface } from '../services/sector.service.interface';
import { type SectorControllerInterface } from './sector.controller.interface';
import { Controller } from '../../../common/controller.decorator';

@Controller
export class SectorController implements SectorControllerInterface {
  constructor(private readonly sectorService: SectorServiceInterface) {}

  async createSector(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const createSectorDto: CreateSectorDTO = req.body;
    const sector = await this.sectorService.createSector(createSectorDto);

    return res.status(201).json({
      status: 'success',
      data: sector,
    });
  }
}
