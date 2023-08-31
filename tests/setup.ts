import 'dotenv/config';

import { mockPrisma } from './__mocks__/prisma-mock';
process.env.NODE_ENV = 'test';

jest.mock('@prisma/client', () => ({
  __esModule: true,
  PrismaClient: jest.fn(() => mockPrisma),
}));
