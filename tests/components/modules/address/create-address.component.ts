import { AddressRepository } from '@modules/address/repositories/address.repository';
import { userMock } from '@test/units/modules/users/mocks/users-mock';
import { AuthService } from '@modules/auth/services/auth.service';
import { server } from '@test/components/setup';
import { When, Then } from '@cucumber/cucumber';
import request, { Response } from 'supertest';
import * as sinon from 'sinon';
import assert from 'assert';

import {
  addressMock,
  createAddressMock,
} from '@test/units/modules/address/mocks/address-mock';

import {
  accessToken,
  refreshToken,
  sessionMock,
} from '@test/units/modules/sessions/mocks/sessions-mock';
import { AuthRepository } from '@modules/auth/repositories/auth.repository';

let response: Response;

When('a user send a post request to {string}', async function (url: string) {
  const createUserRepositoryStub = sinon.stub(
    AddressRepository.prototype,
    'createAddress'
  );

  const findUserByIdRepositoryStub = sinon.stub(
    AuthRepository.prototype,
    'findUserById'
  );

  const createSessionServiceStub = sinon.stub(
    AuthService.prototype,
    'findSessionById'
  );

  createSessionServiceStub.callsFake(() => Promise.resolve(sessionMock));
  createUserRepositoryStub.callsFake(() => Promise.resolve(addressMock));
  findUserByIdRepositoryStub.callsFake(() => Promise.resolve(userMock));

  response = await request(server.app)
    .post(url)
    .set({
      Authorization: `Bearer ${accessToken}`,
      'Refresh-Token': refreshToken,
      Accept: 'application/json',
    })
    .send(createAddressMock);

  createUserRepositoryStub.restore();
  createSessionServiceStub.restore();
  findUserByIdRepositoryStub.restore();
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
