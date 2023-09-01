export const mockPrisma = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  product: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
  sector: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
  fabricator: {
    create: jest.fn(),
  },
  address: {
    create: jest.fn()
  }
};
