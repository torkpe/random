import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import { createToken } from '../../utils/auth';
import { userTypes, endpointPrefix } from '../../utils/constants';

chai.use(chaiHttp);

const { expect } = chai;

describe('Admin', () => {
  let token;
  let agent;
  let ticket;
  before(async () => {
    token = createToken({
      id: 1,
      type: userTypes.ADMIN
    });
  });

  it('should be able to fetch all non-admin users', async () => {
    const response = await chai.request(app)
      .get(`${endpointPrefix}/admin/users`)
      .set('Authorization', token);
    agent = response.body.data.find(val => val.type === userTypes.AGENT);
    expect(response.body.data.length).to.eql(3);
  });

  it('should be able to fetch all agents users', async () => {
    const response = await chai.request(app)
      .get(`${endpointPrefix}/admin/users?type=user`)
      .set('Authorization', token);
    expect(response.body.data.length).to.eql(2);
  });

  it('should be able to fetch all agents users', async () => {
    const response = await chai.request(app)
      .get(`${endpointPrefix}/admin/users?type=agent`)
      .set('Authorization', token);
    expect(response.body.data.length).to.eql(1);
  });

  it('should be able to fetch all tickets', async () => {
    const response = await chai.request(app)
      .get(`${endpointPrefix}/admin/tickets/`)
      .set('Authorization', token);
    ticket = response.body.data[0];

    expect(response.body.data.length).to.eql(2);
  });

  it('should be able to assign ticket', async () => {
    const response = await chai.request(app)
      .patch(`${endpointPrefix}/admin/tickets/${ticket.id}`)
      .set('Authorization', token)
      .send({
        agentId: agent.id
      });
    expect(response.body.message).eql('Successfully assigned ticket');
    expect(response.status).eql(200);
  });

  it('should not be able to assign inexistent ticket', async () => {
    const response = await chai.request(app)
      .patch(`${endpointPrefix}/admin/tickets/0`)
      .set('Authorization', token)
      .send({
        agentId: agent.id
      });
    expect(response.body.error).eql('Could not find this ticket. Perhaps it\'s been resolved');
    expect(response.status).eql(404);
  });

  it('should not be able to assign ticket to same agent', async () => {
    const response = await chai.request(app)
      .patch(`${endpointPrefix}/admin/tickets/${ticket.id}`)
      .set('Authorization', token)
      .send({
        agentId: agent.id
      });
    expect(response.body.error).eql('Already assigned this ticket to this agent');
    expect(response.status).eql(409);
  });

  it('should not be able to assign ticket to same agent', async () => {
    const response = await chai.request(app)
      .get(`${endpointPrefix}/admin/tickets/report`)
      .set('Authorization', token);
    expect(response.type).eql('text/csv');
    expect(response.status).eql(200);
  });

  it('should be able to add agent', async () => {
    const response = await chai.request(app)
      .post(`${endpointPrefix}/admin/add-agent`)
      .set('Authorization', token)
      .send({
        name: 'test agent',
        email: 'test22@agent.com',
        password: 'test12'
      });
    expect(response.body.message).eql('Succesfully created agent');
    expect(response.body).not.have.own.property('token');
    expect(response.status).eql(201);
  });
});
