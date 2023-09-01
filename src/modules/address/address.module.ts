import { BaseModule } from "../../common/baseModule";
import { AddressRouter } from "./routers/address.router";
import { AddressService } from "./services/address.service";
import { BaseRouter } from "../../common/baseRouter.interface";
import { AddressController } from "./controllers/address.controller";
import { AddressRepository } from "./repositories/address.repository";

export class AddressModule implements BaseModule{
  public router: BaseRouter;
  public service: AddressService;
  public controller: AddressController;
  public repository: AddressRepository;

  constructor() {
    this.repository = new AddressRepository();
    this.service = new AddressService(this.repository);
    this.controller = new AddressController(this.service);
    this.router = new AddressRouter(this.controller)
  }
}

export default new AddressModule();