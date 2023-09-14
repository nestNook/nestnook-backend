import { PrismaClient } from '@prisma/client';
import config from '../config';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.databaseUrl,
    },
  },
});

export class Database {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async connect(): Promise<void> {
    await this.prisma.$connect();
    console.log('Database connected');
  }

  async disconnect(): Promise<void> {
    this.prisma?.$disconnect();
  }
}

export default new Database();
