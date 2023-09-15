import { FabricatorRepository } from '@modules/fabricators/repositories/fabricators.repository';
import { server } from '@test/components/setup';
import { Given, Then, When } from '@cucumber/cucumber';
import request, { Response } from 'supertest';
import assert from 'assert';
import sinon from 'sinon';
import {
  createFabricatorMock,
  fabricatorMock,
} from '@test/units/modules/fabricators/mocks/fabricator-mock';
import { Fabricator } from '@modules/fabricators/dtos';
import {
  sessionMock,
  accessToken,
  refreshToken,
} from '@test/__mocks__/sessions-mock';
import { MockSession } from '@test/__mocks__/sessions-mocks';
import { adminMock } from '@test/__mocks__/admin-user-mock';

let response: Response;

Given(
  'an admin send a post request to {string} to create a new fabricator',
  async function (url: string) {
    const createFabricatorStub = sinon.stub(
      FabricatorRepository.prototype,
      'createFabricator',
    );

    MockSession.mockSession({ user: adminMock });
    createFabricatorStub.callsFake(() => Promise.resolve(fabricatorMock));

    response = await request(server.app)
      .post(url)
      .set({
        Authorization: `Bearer ${accessToken}`,
        'Refresh-Token': refreshToken,
        Accept: 'application/json',
      })
      .send(createFabricatorMock);

    createFabricatorStub.restore();
    MockSession.restoreSessionMock();
  },
);

Then(
  'the create fabricator response status code should be {int}',
  function (statusCode: number) {
    assert.equal(response.statusCode, statusCode);
  },
);

Then('the response body should contain the fabricator data', function () {
  const body: { status: string; data: Fabricator } = response.body;

  assert(body.data);
});

Given(
  'an admin send a get request to {string} to find a fabricator',
  async function (url: string) {
    const repositoryStub = sinon.stub(
      FabricatorRepository.prototype,
      'findById',
    );

    repositoryStub.callsFake(() => Promise.resolve(fabricatorMock));

    response = await request(server.app)
      .get(`${url}/${fabricatorMock}`)
      .send(fabricatorMock.id);
    repositoryStub.restore();
  },
);

When(
  'the find fabricator by id response status code should be {int}',
  function (statusCode: number) {
    assert.equal(response.statusCode, statusCode);
  },
);

Then('the response body shuld contain the fabricator data', function () {
  const body: { status: string; data: Fabricator } = response.body;

  assert(body.data);
});

Given(
  'an admin send a patch request to {string} to update a fabricator',
  async function (url: string) {
    const repositoryStub = sinon.stub(
      FabricatorRepository.prototype,
      'updateFabricator',
    );

    MockSession.mockSession({ user: adminMock });
    
    repositoryStub.callsFake(() => Promise.resolve(fabricatorMock));
    
    response = await request(server.app)
    .patch(`${url}/${fabricatorMock.id}`) .set({
      Authorization: `Bearer ${accessToken}`,
      'Refresh-Token': refreshToken,
      Accept: 'application/json',
    })
    .send(fabricatorMock);
    
    MockSession.restoreSessionMock();
    repositoryStub.restore();
  },
);

When(
  'the update fabricator response status code is {int}',
  function (statusCode: number) {
    assert.equal(response.statusCode, statusCode);
  },
);

Then('the response body should contain new fabricator data', function () {
  const body: { status: string; data: Fabricator } = response.body;

  assert(body.data);
});

Given(
  'an admin send a delete request to {string} to delete a fabricator',
  async function (url: string) {
    const repositoryStub = sinon.stub(
      FabricatorRepository.prototype,
      'deleteFabricator',
    );
    MockSession.mockSession({user: adminMock});
    repositoryStub.callsFake(() => Promise.resolve(fabricatorMock));
    
    response = await request(server.app)
    .delete(`${url}/${fabricatorMock.id}`) .set({
      Authorization: `Bearer ${accessToken}`,
      'Refresh-Token': refreshToken,
      Accept: 'application/json',
    })
    .send();
    
    MockSession.restoreSessionMock();
    repositoryStub.restore();
  },
);

When(
  'the delete fabricator response status code is {int}',
  function (statusCode: number) {
    assert.equal(response.statusCode, statusCode);
  },
);

Then('the delete fabricator response body should be empty', function () {
  const body: { status: string } = response.body;
  assert(body);
});
