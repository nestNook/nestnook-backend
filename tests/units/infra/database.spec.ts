import { mockPrisma } from '@test/__mocks__/prisma-mock';
import { Database } from '@infra/database';

describe('Database module', () => {
  let database: Database;

  beforeEach(() => {
    database = new Database();
  });

  it('should be able to connect to database', async () => {
    const connectSpy = jest.spyOn(mockPrisma, '$connect');

    await database.connect();

    expect(connectSpy).toHaveBeenCalled();
  });

  it('should be able to disconnect from database', async () => {
    const connectSpy = jest.spyOn(mockPrisma, '$connect');
    const disconnectSpy = jest.spyOn(mockPrisma, '$disconnect');

    await database.connect();
    await database.disconnect();

    expect(connectSpy).toHaveBeenCalled();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
