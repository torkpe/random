import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { createToken } from '../../utils/auth';
import {
  userTypes,
  endpointPrefix,
} from '../../utils/constants';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users', () => {
  let token;
  let ticket;
  before(async () => {
    token = createToken({
      id: 100,
      type: userTypes.USER
    });
  });

  it('should fetch all tickets', async () => {
    const response = await chai.request(app)
      .get(`${endpointPrefix}/users/tickets`)
      .set('Authorization', token);
    ticket = response.body.data[0];
    expect(response.body.data.length).to.eql(2);
  });

  it('should be able to create ticket', async () => {
    const response = await chai.request(app)
      .post(`${endpointPrefix}/users/tickets`)
      .set('Authorization', token)
      .send({
        title: 'random text for title',
        body: 'another random text',
      });
    expect(response.body.message).eql('Successfully created ticket');
    expect(response.status).eql(200);
  });

  it('should be able to add comment to ticket', async () => {
    const response = await chai.request(app)
      .post(`${endpointPrefix}/users/tickets/${ticket.id}/comment`)
      .set('Authorization', token)
      .send({
        comment: 'test that comment works'
      });
    expect(response.body.message).eql('Successfully added comment');
    expect(response.status).eql(201);
  });
});