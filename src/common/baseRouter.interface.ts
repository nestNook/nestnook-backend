import { Handler, Route } from './route.interface';

export interface BaseRouter {
  routePrefix?: string;
  routes: Route[];
  middlewares?: Array<Handler>;
}
