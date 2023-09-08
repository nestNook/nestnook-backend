import { SectorRepositoryInterface } from '@modules/sectors/repositories/sector.repository.interface';

export class SectorRepositoryMock implements SectorRepositoryInterface {
  createSector = jest.fn();
  findSectorByName = jest.fn();
}
