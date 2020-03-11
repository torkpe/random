import { spy } from 'sinon';
import { expect } from 'chai';
import { createToken } from '../../utils/auth';
import { checkIfAuthenticated } from '../authentication';
import { authorize } from '../authorization';
import {
  createUser,
  createTicket,
  createComment,
  login
} from '../validation';

describe('Middleware', () => {
  let token;
  before(() => {
    token = createToken({
      id: 1,
      type: 'USER'
    });
  });

  describe('checkIfAuthenticated', () => {
    it ('should call next if token is valid', () => {
      const nextSpy = spy();
      const request = {
        headers: {
          Authorization: token
        }
      }
      checkIfAuthenticated(request, {}, nextSpy);
      expect(request.user.id).eql(1);
      expect(request.user.type).eql('USER');
      expect(nextSpy.calledOnce).to.be.true;
    });

    it ('should not call next if token is valid', () => {
      const nextSpy = spy();
      const request = {
        headers: {
          Authorization: 'token'
        }
      }
      const response = {
        send: function(){ },
        status: function(responseStatus) {
            expect(responseStatus).eql(500)
            return this; 
        }
      }
      checkIfAuthenticated(request, response, nextSpy);
      expect(nextSpy.calledOnce).to.be.false;
    });

    it ('should return 401 if token does not exist', () => {
      const nextSpy = spy();
      const request = {
        headers: {}
      }
      const response = {
        send: function(error){
          expect(error.error).to.eql('Unauthenticated. Please attach token to headers')
         },
        status: function(responseStatus) {
            expect(responseStatus).eql(401)
            return this; 
        }
      }
      checkIfAuthenticated(request, response, nextSpy);
      expect(nextSpy.calledOnce).to.be.false;
    });
  });

  describe('Authorize', () => {
    it('should call next when userType matches expected type ', () => {
      const nextSpy = spy();
      const returnedAuthorizeFunction = authorize('USER');
      const request = {
        user: {
          type: 'USER'
        }
      }
      returnedAuthorizeFunction(request, {}, nextSpy);
      expect(nextSpy.calledOnce).eql(true)
    });
  });

  describe('createUser', () => {
    it('should call next when details are properly entered', () => {
      const nextSpy = spy();
      const request = {
        body: {
          name: 'name',
          email: 'name@email.com',
          password: '1234'
        }
      }
      createUser(request, {}, nextSpy);
      expect(nextSpy.calledOnce).eql(true);
    });
  });

  describe('login', () => {
    it('should call next when details are properly entered', () => {
      const nextSpy = spy();
      const request = {
        body: {
          email: 'name@email.com',
          password: '1234'
        }
      }
      login(request, {}, nextSpy);
      expect(nextSpy.calledOnce).eql(true);
    });
  });

  describe('createTicket', () => {
    it('should call next when details are properly entered', () => {
      const nextSpy = spy();
      const request = {
        body: {
          title: 'name@email.com',
          body: '1234'
        },
        user: {
          id: 1
        }
      }
      createTicket(request, {}, nextSpy);
      expect(nextSpy.calledOnce).eql(true);
    });
  });

  describe('createComment', () => {
    it('should call next when details are properly entered', () => {
      const nextSpy = spy();
      const request = {
        body: {
          comment: 'name@email.com'
        },
        user: {
          id: 1
        },
        params: {
          ticketId: 1
        }
      }
      createComment(request, {}, nextSpy);
      expect(nextSpy.calledOnce).eql(true);
    });
  });
});