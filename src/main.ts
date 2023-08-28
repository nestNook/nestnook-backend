import Server, { Server as ServerType } from './infra/server';
import Database, { Database as DatabaseType } from './infra/database';

export class App {
  private server: ServerType;
  private database: DatabaseType;

  constructor() {
    this.server = Server;
    this.database = Database;
  }

  async initialize() {
    await this.database.connect();
    this.server.start();

    process.on('SIGALRM', () => {
      this.server.stop(async () => {
        await this.database.disconnect();
      });
    });
  }
}

new App().initialize();
