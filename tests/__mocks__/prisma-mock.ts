export const mockPrisma = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  product: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
};