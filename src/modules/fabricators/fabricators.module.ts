import { FabricatorRepository } from './repositories/fabricators.repository';
import { FabricatorsController } from './controllers/fabricators.controller';
import { FabricatorsService } from './services/fabricators.service';
import { FabricatorsRouter } from './routers/fabricators.router';

export class FabricatorsModule {
  public repository: FabricatorRepository;
  public service: FabricatorsService;
  public controller: FabricatorsController;
  public router: FabricatorsRouter;

  constructor() {
    this.repository = new FabricatorRepository();
    this.service = new FabricatorsService(this.repository);
    this.controller = new FabricatorsController(this.service);
    this.router = new FabricatorsRouter(this.controller);
  }
}

export default new FabricatorsModule();
