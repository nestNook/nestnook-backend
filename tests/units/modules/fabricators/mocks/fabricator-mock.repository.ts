import { FabricatorRepositoryInterface } from '../../../../../src/modules/fabricators/repositories/fabricators.repository.interface'

export class FabricatorRepositoryMock implements FabricatorRepositoryInterface {
  createFabricator = jest.fn();
  find = jest.fn();
  findById = jest.fn();
  updateFabricator = jest.fn();
  deleteFabricator = jest.fn();
  findOr = jest.fn();
}