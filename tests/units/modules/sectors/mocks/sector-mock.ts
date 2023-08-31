import { Sector } from '../../../../../src/modules/sectors/dtos';
import { CreateSectorDTO } from './../../../../../src/modules/sectors/dtos/create-sector.dto';
import { randomUUID } from 'crypto';

export const createSectorMock: CreateSectorDTO = {
  name: 'Limpeza',
};

export const sectorMock: Sector = {
  id: randomUUID(),
  name: 'Limpeza',
  created_at: new Date(),
  updated_at: new Date(),
};
