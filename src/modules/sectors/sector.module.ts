import { type BaseModule } from '../../common/baseModule';
import { SectorRouter } from './routers/sector.router';
import { SectorService } from './services/sector.service';
import { type BaseRouter } from '../../common/baseRouter.interface';
import { SectorController } from './controllers/sector.controller';
import { SectorRepository } from './repositories/sector.repository';

export class SectorModule implements BaseModule {
  public router: BaseRouter;
  public service: SectorService;
  public controller: SectorController;
  public repository: SectorRepository;

  constructor() {
    this.repository = new SectorRepository();
    this.service = new SectorService(this.repository);
    this.controller = new SectorController(this.service);
    this.router = new SectorRouter(this.controller);
  }
}

export default new SectorModule();
