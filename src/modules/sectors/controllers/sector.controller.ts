import { type CreateSectorDTO } from '../dtos';
import { type Request, type Response } from 'express';
import { type SectorServiceInterface } from '../services/sector.service.interface';
import { type SectorControllerInterface } from './sector.controller.interface';
import { Controller } from '../../../common/controller.decorator';
import { UpdateSectorDTO } from '../dtos/update-sector.dto';

@Controller
export class SectorController implements SectorControllerInterface {
  constructor(private readonly sectorService: SectorServiceInterface) {}

  async createSector(req: Request, res: Response): Promise<Response> {
    const createSectorDto: CreateSectorDTO = req.body;
    const sector = await this.sectorService.createSector(createSectorDto);

    return res.status(201).json({
      status: 'success',
      data: sector,
    });
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const sector = await this.sectorService.findById(id);

    return res.status(200).json({
      status: 'success',
      data: sector,
    });
  }

  async updateSector(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const sector: UpdateSectorDTO = req.body;
    const updatedSector = await this.sectorService.updateSector(id, sector);

    return res.status(200).json({
      status: 'success',
      data: updatedSector,
    });
  }

  async deleteSector(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deletedSector = await this.sectorService.deleteSector(id);

    return res.status(200).json({
      status: 'success',
      data: deletedSector,
    });
  }
}
