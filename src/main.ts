import Server, { Server as ServerType } from './infra/server';
import Database, { Database as DatabaseType } from './infra/database';
import MongoDB, { MongoDB as MongoDBType } from '@infra/mongodb';

export class App {
  private server: ServerType;
  private database: DatabaseType;
  private mongodb: MongoDBType;

  constructor() {
    this.server = Server;
    this.database = Database;
    this.mongodb = MongoDB;
  }

  async initialize() {
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
