import { type Router } from 'express';
import { type Handler, type Route } from './route.interface';

export interface ExcludeOptions {
  path: string;
  method: keyof Router;
}

export interface MiddlewaresOptions {
  middleware: Handler;
  exclude?: ExcludeOptions[];
}

export interface BaseRouter {
  routePrefix?: string;
  routes: Route[];
  middlewaresOptions?: MiddlewaresOptions[];
}
