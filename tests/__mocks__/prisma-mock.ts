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
    update: jest.fn(),
    delete: jest.fn(),
  },
  fabricator: {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
  },
  address: {
    create: jest.fn(),
  },
  user: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
};
