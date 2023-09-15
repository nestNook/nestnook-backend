import { AddressRouter } from './routers/address.router';
import { AddressService } from './services/address.service';
import { AddressController } from './controllers/address.controller';
import { AddressRepository } from './repositories/address.repository';

export class AddressModule {
  public repository: AddressRepository;
  public service: AddressService;
  public controller: AddressController;
  public router: AddressRouter;

  constructor() {
    this.repository = new AddressRepository();
    this.service = new AddressService(this.repository);
    this.controller = new AddressController(this.service);
    this.router = new AddressRouter(this.controller);
  }
}

export default new AddressModule();
