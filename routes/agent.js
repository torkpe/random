import { Router } from 'express';
import {
  agentControllers,
  commentControllers
} from '../controllers';
import { checkIfAuthenticated } from '../middlewares/authentication';
import { authorize } from '../middlewares/authorization';
import { createComment } from '../middlewares/validation';
import { userTypes } from '../utils/constants';

const route = Router();

route.get('/tickets',
  checkIfAuthenticated, authorize(userTypes.AGENT), agentControllers.getAssignedTickets);
route.patch('/tickets/:ticketId',
  checkIfAuthenticated, authorize(userTypes.AGENT), agentControllers.updateTicketStatus);
route.post('/tickets/:ticketId/comment',
  checkIfAuthenticated, authorize(userTypes.AGENT), createComment, commentControllers.createComment);


export default route;