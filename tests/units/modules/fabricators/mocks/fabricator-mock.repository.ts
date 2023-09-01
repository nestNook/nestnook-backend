import { FabricatorRepositoryInterface } from '../../../../../src/modules/fabricators/repositories/fabricators.repository.interface'

export class FabricatorRepositoryMock implements FabricatorRepositoryInterface {
  createFabricator = jest.fn();
}