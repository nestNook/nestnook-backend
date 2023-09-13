import { FabricatorRepository } from './repositories/fabricators.repository';
import { FabricatorsController } from './controllers/fabricators.controller';
import { FabricatorsService } from './services/fabricators.service';
import { FabricatorsRouter } from './routers/fabricators.router';
import { BaseRouter } from '@common/baseRouter.interface';
import { FabricatorServiceInterface } from './services/fabricators.service.interface';
import { FabricatorsControllerInterface } from './controllers/fabricators.controller.interface';

export class FabricatorsModule {
  public repository: FabricatorRepository;
  public service: FabricatorServiceInterface;
  public controller: FabricatorsControllerInterface;
  public router: BaseRouter;

  constructor() {
    this.repository = new FabricatorRepository();
    this.service = new FabricatorsService(this.repository);
    this.controller = new FabricatorsController(this.service);
    this.router = new FabricatorsRouter(this.controller);
  }
}

export default new FabricatorsModule();
