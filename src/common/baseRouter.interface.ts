import { type Handler, type Route } from './route.interface';

export interface BaseRouter {
  routePrefix?: string;
  routes: Route[];
  middlewares?: Handler[];
}
