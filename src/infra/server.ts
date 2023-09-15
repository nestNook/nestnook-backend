import { type Handler, type Route } from '../common/route.interface';
import { errorHandler } from '@common/error-handler.middleware';
import { HealthCheckRoute } from '@common/health-check.route';
import express, { type Application, Router } from 'express';
import { NotFoundRoute } from '@common/not-found.route';
import { type Server as HttpServer } from 'http';
import AppModule from '../modules/app.module';
import swaggerUi from 'swagger-ui-express';
import swagger from '../../swagger.json';
import cookieParser from 'cookie-parser';
import config from '@config/index';
import {
  type MiddlewaresOptions,
  type BaseRouter,
} from '../common/baseRouter.interface';
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

  addRouter({
    routes,
    routePrefix = '/',
    middlewaresOptions = [],
  }: BaseRouter): void {
    console.group(`${routePrefix}:`);
    routes.forEach(({ method, path }): void => {
      console.log(`${method.toLocaleUpperCase()} ${path}`);
    });
    this.router.use(routePrefix, this.mapRoutes(routes, middlewaresOptions));
    console.groupEnd();
  }

  private mapRoutes(
    routes: Route[],
    middlewaresOptions: MiddlewaresOptions[],
  ): Router {
    const router = express.Router();

    routes.forEach(
      ({ handler, method, middlewares: pathMiddlewares = [], path }) => {
        switch (method) {
          case 'get': {
            const middlewares = this.resolveMiddlewares(
              pathMiddlewares,
              path,
              method,
              middlewaresOptions,
            );
            router.get(path, ...middlewares, handler);
            return;
          }

          case 'post': {
            const middlewares = this.resolveMiddlewares(
              pathMiddlewares,
              path,
              method,
              middlewaresOptions,
            );
            router.post(path, ...middlewares, handler);
            return;
          }

          case 'put': {
            const middlewares = this.resolveMiddlewares(
              pathMiddlewares,
              path,
              method,
              middlewaresOptions,
            );
            router.put(path, ...middlewares, handler);
            return;
          }

          case 'patch': {
            const middlewares = this.resolveMiddlewares(
              pathMiddlewares,
              path,
              method,
              middlewaresOptions,
            );
            router.patch(path, ...middlewares, handler);
            return;
          }

          case 'delete': {
            const middlewares = this.resolveMiddlewares(
              pathMiddlewares,
              path,
              method,
              middlewaresOptions,
            );
            router.delete(path, ...middlewares, handler);
            return;
          }

          default: {
            console.log(`Unknown method: ${method}`);
          }
        }
      },
    );

    return router;
  }

  private resolveMiddlewares(
    pathMiddlewares: Handler[],
    path: string,
    method: string,
    middlewaresOptions: MiddlewaresOptions[],
  ): Handler[] {
    const filteredMiddlewares = middlewaresOptions.filter(
      ({ exclude }): boolean => {
        if (!exclude) return true;
        return !exclude.some(({ method: excludeMethod, path: excludePath }) => {
          return excludeMethod === method && excludePath === path;
        });
      },
    );

    const middlewares = [
      ...pathMiddlewares,
      ...filteredMiddlewares.map(({ middleware }) => middleware),
    ];

    return middlewares;
  }
}

export default new Server();
