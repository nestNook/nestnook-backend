import { BaseRouter } from '../../../../src/common/baseRouter.interface';

export const routerMock: BaseRouter = {
  routePrefix: '/',
  routes: [
    {
      handler: jest.fn(),
      method: 'get',
      middlewares: [],
      path: '/',
    },
    {
      handler: jest.fn(),
      method: 'post',
      middlewares: [],
      path: '/',
    },
    {
      handler: jest.fn(),
      method: 'put',
      middlewares: [],
      path: '/',
    },
    {
      handler: jest.fn(),
      method: 'patch',
      middlewares: [],
      path: '/',
    },
    {
      handler: jest.fn(),
      method: 'delete',
      middlewares: [],
      path: '/',
    },
    {
      handler: jest.fn(),
      method: 'options',
      middlewares: [],
      path: '/',
    },
  ],
};
