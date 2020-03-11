import { Router } from 'express';
import {
  userControllers,
  commentControllers
} from '../controllers';
import { checkIfAuthenticated } from '../middlewares/authentication';
import { createTicket } from '../middlewares/validation';
import { authorize } from '../middlewares/authorization';
import { createComment } from '../middlewares/validation';
import { userTypes } from '../utils/constants';

const route = Router();

route.get('/tickets',
  checkIfAuthenticated, authorize(userTypes.USER), userControllers.getTickets);
route.post('/tickets',
  checkIfAuthenticated, authorize(userTypes.USER), createTicket, userControllers.createTicket);
route.post('/tickets/:ticketId/comment',
  checkIfAuthenticated, authorize(userTypes.USER), createComment, commentControllers.createComment);

export default route;