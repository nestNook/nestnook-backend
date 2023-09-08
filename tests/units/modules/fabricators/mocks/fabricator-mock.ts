import { Fabricator, CreateFabricatorDTO, UpdateFabricatorDTO } from '../../../../../src/modules/fabricators/dtos'
import { randomUUID } from 'crypto'

export const createFabricatorMock: CreateFabricatorDTO = {
  registry: '11.111.111/0001-11',
  name: 'Nestlé',
  phone_number: "99999-9999",
  email: "nestlé@email.com"
}

export const fabricatorMock: Fabricator = {
  id: randomUUID(),
  registry: '11.111.111/0001-11',
  name: 'Nestlé',
  phone_number: "99999-9999",
  email: "nestlé@email.com",
  created_at: new Date(),
  updated_at: new Date(),
}