import { errorHandler } from '@common/error-handler.middleware';
import { type BaseRouter } from '../common/baseRouter.interface';
import express, { type Application, Router } from 'express';
import { type Route } from '../common/route.interface';
import AppModule from '../modules/app.module';
import { type Server as HttpServer } from 'http';
import swaggerUi from 'swagger-ui-express';
import swagger from '../../swagger.json';
import cookieParser from 'cookie-parser';
import config from '@config/index';
import { HealthCheckRoute } from '@common/health-check.route';
import { NotFoundRoute } from '@common/not-found.route';
export class Server {
  public app: Application;
  public server: HttpServer | undefined;
  private readonly router: Router;

  constructor() {
    this.app = express();
    this.router = Router();
  }

  start(): void {
    this.server = this.app.listen(config.port);
    this.preMiddlewares();
    this.routes();
    this.postMiddlewares();
  }

  stop(cb?: () => void): void {
    if (!this.server) return;
    this.server.close(cb);
  }

  preMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      `${config.apiPrefix}/api-docs`,
      swaggerUi.serve,
      swaggerUi.setup(swagger),
    );
    this.app.get(`${config.apiPrefix}/health-check`, HealthCheckRoute);
  }

  postMiddlewares(): void {
    this.app.use(errorHandler());
    this.app.use(NotFoundRoute);
  }

  routes(): void {
    AppModule.routers.forEach((router) => {
      this.addRouter(router);
    });
    this.app.use(config.apiPrefix, this.router);
    console.log(config.apiPrefix);
  }

  addRouter({ routes, routePrefix = '/', middlewares = [] }: BaseRouter): void {
    console.group(`${routePrefix}:`);
    routes.forEach(({ method, path }): void => {
      console.log(`${method.toLocaleUpperCase()} ${path}`);
    });
    this.router.use(routePrefix, ...middlewares, this.mapRoutes(routes));
    console.groupEnd();
  }

  private mapRoutes(routes: Route[]): Router {
    const router = express.Router();

    routes.forEach(({ handler, method, middlewares = [], path }) => {
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
