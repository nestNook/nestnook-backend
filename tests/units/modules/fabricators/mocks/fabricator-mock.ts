import { Fabricator, CreateFabricatorDTO } from '../../../../../src/modules/fabricators/dtos'
import { randomUUID } from 'crypto'

export const createFabricatorMock: CreateFabricatorDTO = {
  name: 'Nestlé',
  address_id: '1',
  email: "nestlé@email.com",
  phone_number: "99999-9999",
  registry: '11.111.111/0001-11'
}

export const fabricatorMock: Fabricator = {
  id: randomUUID(),
  name: 'Nestlé',
  address_id: '1',
  email: "nestlé@email.com",
  phone_number: "99999-9999",
  registry: '11.111.111/0001-11',
  created_at: new Date(),
  updated_at: new Date(),
}

