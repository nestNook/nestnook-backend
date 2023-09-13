import { routerMock } from './mocks/router-mock';
import { Server } from '@infra/server';

describe('Server module', () => {
  let server: Server;

  beforeEach(() => {
    server = new Server();
  });

  afterEach(() => {
    server.stop();
  });

  it('should start server with all routes and middlewares', async () => {
    const postMiddlewaresApy = jest.spyOn(server, 'postMiddlewares');
    const preMiddlewaresApy = jest.spyOn(server, 'preMiddlewares');
    const routesSpy = jest.spyOn(server, 'routes');

    server.start();

    expect(postMiddlewaresApy).toHaveBeenCalled();
    expect(preMiddlewaresApy).toHaveBeenCalled();
    expect(routesSpy).toHaveBeenCalled();
  });

  it('should map all routes correctly', async () => {
    const addRouterSpy = jest.spyOn(server, 'addRouter');
    server.routes();
    server.addRouter(routerMock);
    expect(addRouterSpy).toHaveBeenCalled();
  });
});
