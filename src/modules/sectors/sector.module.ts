import { type BaseModule } from '../../common/baseModule';
import { SectorRouter } from './routers/sector.router';
import { SectorService } from './services/sector.service';
import { type BaseRouter } from '../../common/baseRouter.interface';
import { SectorController } from './controllers/sector.controller';
import { SectorRepository } from './repositories/sector.repository';
import { SectorControllerInterface } from './controllers/sector.controller.interface';
import { SectorRepositoryInterface } from './repositories/sector.repository.interface';
import { SectorServiceInterface } from './services/sector.service.interface';

export class SectorModule implements BaseModule {
  public router: BaseRouter;
  public service: SectorServiceInterface;
  public controller: SectorControllerInterface;
  public repository: SectorRepositoryInterface;

  constructor() {
    this.repository = new SectorRepository();
    this.service = new SectorService(this.repository);
    this.controller = new SectorController(this.service);
    this.router = new SectorRouter(this.controller);
  }
}

export default new SectorModule();
