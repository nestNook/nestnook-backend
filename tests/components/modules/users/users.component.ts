import { UsersRepository } from '@modules/users/repositories/users.repository';
import { SessionDTO } from '@@types/session.dto';
import { server } from '@test/components/setup';
import { Then, When } from '@cucumber/cucumber';
import request, { Response } from 'supertest';
import assert from 'assert';
import sinon from 'sinon';
import {
  createUserMock,
  userMock,
} from '@test/units/modules/users/mocks/users-mock';
import { SessionsService } from '@modules/session/services/sessions.service';
import { sessionDTOMock } from '@test/__mocks__/sessions-mock';

let response: Response;

When(
  'a user send a post request to {string} to create a new user profile',
  async function (url: string) {
    const crateUserRepositoryStub = sinon.stub(
      UsersRepository.prototype,
      'create'
    );
    const findUserRepositoryStub = sinon.stub(
      UsersRepository.prototype,
      'find'
    );

    const createSessionServiceStub = sinon.stub(
      SessionsService.prototype,
      'createSession'
    );

    crateUserRepositoryStub.callsFake(() => Promise.resolve(userMock));
    findUserRepositoryStub.callsFake(() => Promise.resolve(null));
    createSessionServiceStub.callsFake(() => Promise.resolve(sessionDTOMock));

    response = await request(server.app).post(url).send(createUserMock);

    crateUserRepositoryStub.restore();
    findUserRepositoryStub.restore();
    createSessionServiceStub.restore();
  }
);

Then('the response status code should be {int}', function (statusCode: number) {
  assert.equal(response.statusCode, statusCode);
});

Then(
  'the response body should contain the access and refresh tokens',
  function () {
    const body: { status: string; data: SessionDTO } = response.body;

    assert(body.data.access_token);
    assert(body.data.refresh_token);
    assert(body.data.session_id);
  }
);
