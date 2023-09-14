import Server, { type Server as ServerType } from './infra/server';
import Database, { type Database as DatabaseType } from './infra/database';
import MongoDB, { type MongoDB as MongoDBType } from '@infra/mongodb';

export class App {
  private readonly server: ServerType;
  private readonly database: DatabaseType;
  private readonly mongodb: MongoDBType;

  constructor() {
    this.server = Server;
    this.database = Database;
    this.mongodb = MongoDB;
  }

  async initialize(): Promise<void> {
    await this.database.connect();
    await this.mongodb.connect();

    this.server.start();

    process.on('SIGALRM', () => {
      this.server.stop(async () => {
        await this.database.disconnect();
        await this.mongodb.disconnect();
      });
    });
  }
}

new App().initialize();
