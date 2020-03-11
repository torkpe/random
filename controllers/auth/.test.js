import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  endpointPrefix,
} from '../../utils/constants';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users', () => {
  it ('should be able to sign up', async() => {
    const response = await chai.request(app)
    .post(`${endpointPrefix}/auth/signup`)
    .send({
      name: 'user',
      email: 'test22@user.com',
      password: 'test12'
    });
  expect(response.body.message).eql('Succesfully created user');
  expect(response.body).haveOwnProperty('token');
  expect(response.status).eql(201);
  });

  it ('should be able to login', async() => {
    const response = await chai.request(app)
    .post(`${endpointPrefix}/auth/login`)
    .send({
      email: 'test22@user.com',
      password: 'test12'
    });
  expect(response.body.message).eql('Successfully logged in');
  expect(response.body).have.own.property('token');
  expect(response.status).eql(200);
  });
});