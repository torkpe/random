import chai from 'chai';
import chaiHttp from 'chai-http';
import { fn } from 'sequelize';
import app from '../../app';
import { User, Ticket } from '../../models';
import { createToken } from '../../utils/auth';
import {
  userTypes,
  endpointPrefix,
  ticketStatusTypes
} from '../../utils/constants';

chai.use(chaiHttp);

const { expect } = chai;

describe('Agent', () => {
  let agent;
  let createdTicket;
  let token;

  before(async () => {
    agent = await User.findOne({
      where: {
        type: userTypes.AGENT
      }
    });

    createdTicket = await Ticket.create({
      title: 'another text',
      body: 'Some body',
      createdBy: 1,
      createdAt: fn('NOW'),
      assignedTo: agent.id,
      status: ticketStatusTypes.OPEN
    });

    token = createToken({
      id: agent.id,
      type: agent.type
    });
  });

  it('should fetch all tickets', async () => {
    const response = await chai.request(app)
      .get(`${endpointPrefix}/agent/tickets/`)
      .set('Authorization', token);
    expect(response.body.data.length).to.eql(2);
  });

  it('should updtate ticket status', async () => {
    const response = await chai.request(app)
      .patch(`${endpointPrefix}/agent/tickets/${createdTicket.id}`)
      .set('Authorization', token)
      .send({
        status: ticketStatusTypes.CLOSED
      });
    expect(response.body.message).eql('Successfully updated resolved status');
    expect(response.status).eql(200);
  });

  it('should be able to add comment to ticket', async () => {
    const response = await chai.request(app)
      .post(`${endpointPrefix}/agent/tickets/${createdTicket.id}/comment`)
      .set('Authorization', token)
      .send({
        comment: 'test that comment works'
      });
    expect(response.body.message).eql('Successfully added comment');
    expect(response.status).eql(201);
  });

  it('should not be able to add invalid comment to ticket', async () => {
    const response = await chai.request(app)
      .post(`${endpointPrefix}/agent/tickets/${createdTicket.id}/comment`)
      .set('Authorization', token)
      .send({
        comment: ''
      });
    expect(response.body.error).eql('All fields are required');
    expect(response.status).eql(400);
  });
});