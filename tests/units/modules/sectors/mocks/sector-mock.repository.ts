import { SectorRepositoryInterface } from '@modules/sectors/repositories/sector.repository.interface';

export class SectorRepositoryMock implements SectorRepositoryInterface {
  createSector = jest.fn();
  findByName = jest.fn();
  findById = jest.fn();
  updateSector = jest.fn();
  deleteSector = jest.fn()
}
