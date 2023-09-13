import { AddressRepository } from '@modules/address/repositories/address.repository';
import {
  addressMock,
  createAddressMock,
} from '@test/units/modules/address/mocks/address-mock';
import { server } from '@test/components/setup';
import { When, Then } from '@cucumber/cucumber';
import request, { Response } from 'supertest';
import * as sinon from 'sinon';
import assert from 'assert';
import {
  accessToken,
  refreshToken,
} from '@test/units/modules/sessions/mocks/sessions-mock';

let response: Response;

When('a user send a post request to {string}', async function (url: string) {
  const repositoryStub = sinon.stub(
    AddressRepository.prototype,
    'createAddress'
  );
  repositoryStub.callsFake(() => Promise.resolve(addressMock));

  response = await request(server.app)
    .post(url)
    .set({
      Authorization: `Bearer ${accessToken}`,
      'Refresh-Token': refreshToken,
      Accept: 'application/json',
    })
    .send(createAddressMock);

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
