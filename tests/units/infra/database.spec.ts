import { PrismaClient } from '@prisma/client';
import { mockPrisma } from '../../__mocks__/prisma-mock';

describe('Database', () => {
  it('should be able to connect to database', async () => {
    const connectSpy = jest.spyOn(mockPrisma, '$connect');

    mockPrisma.$connect();

    expect(connectSpy).toHaveBeenCalled();
  });

  it('should be able to disconnect from database', async () => {
    const connectSpy = jest.spyOn(mockPrisma, '$connect');
    const disconnectSpy = jest.spyOn(mockPrisma, '$disconnect');

    mockPrisma.$connect();
    mockPrisma.$disconnect();

    expect(connectSpy).toHaveBeenCalled();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
