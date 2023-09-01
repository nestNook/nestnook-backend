import config from '@config/index';
import AppModule from '../modules/app.module';
import express, { Application, Router } from 'express';
import { Server as HttpServer } from 'http';
import { Route } from '../common/route.interface';
import { BaseRouter } from '../common/baseRouter.interface';

export class Server {
  public app: Application;
  public server: HttpServer | undefined;
  private router: Router;

  constructor() {
    this.app = express();
    this.router = Router();
  }

  start() {
    this.server = this.app.listen(config.port);
    this.middlewares();
    this.routes();
  }

  stop(cb?: () => void) {
    if (!this.server) return;
    this.server.close(cb);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    AppModule.routers.forEach((router) => this.addRouter(router));
    this.app.use(config.apiPrefix, this.router);
    console.log(config.apiPrefix);
    console.log(`Server is running on port ${config.port}`);
  }

  addRouter(router: BaseRouter) {
    const routePrefix = router.routePrefix ?? '/';
    console.group(`[${routePrefix}]:`);
    this.router.use(routePrefix, this.mapRoutes(router.routes));
    console.groupEnd();
  }

  private mapRoutes(routes: Route[]) {
    const router = express.Router();

    routes.forEach(({ handler, method, middlewares, path }) => {
      console.log(`[${method.toLocaleUpperCase()}]: ${path}`);

      switch (method) {
        case 'get': {
          router.get(path, ...middlewares, handler);
          return;
        }

        case 'post': {
          router.post(path, ...middlewares, handler);
          return;
        }

        case 'put': {
          router.put(path, ...middlewares, handler);
          return;
        }

        case 'patch': {
          router.patch(path, ...middlewares, handler);
          return;
        }

        case 'delete': {
          router.delete(path, ...middlewares, handler);
          return;
        }

        default: {
          console.log(`Unknown method: ${method}`);
        }
      }
    });

    return router;
  }
}

export default new Server();
