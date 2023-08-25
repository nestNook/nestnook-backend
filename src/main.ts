import { Server } from './infra/server';
import { Database } from './infra/database';

class App {
  private server: Server;
  private database: Database;

  constructor() {
    this.server = new Server();
    this.database = new Database();
  }

  async initialize() {
    await this.database.connect();
    this.server.start();
  }
}

new App().initialize();
