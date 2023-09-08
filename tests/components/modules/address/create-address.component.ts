import {
  addressMock,
  createAddressMock,
} from '@test/units/modules/address/mocks/address-mock';
import { When, Then, BeforeAll, AfterAll } from '@cucumber/cucumber';
import request, { Response } from 'supertest';
import { Server } from '@infra/server';
import assert from 'assert';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import * as sinon from 'sinon';

let server: Server;
let response: Response;

BeforeAll(() => {
  server = new Server();
  server.start();
});

AfterAll(() => {
  server.stop();
});

When('a user send a post request to {string}', async function (url: string) {
  const repositoryStub = sinon.stub(
    AddressRepository.prototype,
    'createAddress'
  );
  repositoryStub.callsFake(() => Promise.resolve(addressMock));

  response = await request(server.app).post(url).send(createAddressMock);
  repositoryStub.restore();
});

Then('the response status should be {int}', function (status: number) {
  assert.equal(response.statusCode, status);
});

Then(
  'the response body should return a JSON with the address created',
  function () {
    assert(response.body.data.user_id);
    assert(response.body.data.id);
    assert(response.body.data.created_at);
    assert(response.body.data.updated_at);
  }
);