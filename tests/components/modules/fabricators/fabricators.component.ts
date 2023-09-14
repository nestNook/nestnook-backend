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

let response: Response;

Given(
  'an admin send a post request to {string} to create a new fabricator',
  async function (url: string) {
    const repositoryStub = sinon.stub(
      FabricatorRepository.prototype,
      'createFabricator'
    );
    repositoryStub.callsFake(() => Promise.resolve(fabricatorMock));

    response = await request(server.app).post(url).send(createFabricatorMock);
    repositoryStub.restore();
  }
);

Then(
  'the create fabricator response status code should be {int}',
  function (statusCode: number) {
    assert.equal(response.statusCode, statusCode);
  }
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
      'findById'
    );

    repositoryStub.callsFake(() => Promise.resolve(fabricatorMock));

    response = await request(server.app)
      .get(`${url}/${fabricatorMock}`)
      .send(fabricatorMock.id);
    repositoryStub.restore();
  }
);

When(
  'the find fabricator by id response status code should be {int}',
  function (statusCode: number) {
    assert.equal(response.statusCode, statusCode);
  }
);

Then('the response body shuld contain the fabricator data', function () {
  const body: { status: string; data: Fabricator } = response.body;

  assert(body.data);
});
