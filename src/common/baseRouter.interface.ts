import { Route } from './route.interface';

export interface BaseRouter {
  routePrefix?: string;
  routes: Route[];
}
