import express, { Application } from 'express';
import config from '../config';

class Server {
  private app: Application;
  constructor() {
    this.app = express();
  }

  start() {
    this.app.listen(config.port);
    this.middlewares();
    this.routes();

    console.log(`Server is running on port ${config.port}`);
  }

  stop() {}

  middlewares() {}

  routes() {}
}

export { Server };
