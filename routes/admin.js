import { Router } from 'express';
import {
  adminControllers,
  authController
} from '../controllers';
import { checkIfAuthenticated } from '../middlewares/authentication';
import { createUser } from '../middlewares/validation';
import { authorize } from '../middlewares/authorization';
import { userTypes } from '../utils/constants';

const route = Router();

route.get('/users',
  checkIfAuthenticated, authorize(userTypes.ADMIN), adminControllers.getUsers);
route.post('/add-agent',
  checkIfAuthenticated, authorize(userTypes.ADMIN), createUser, authController.createUser);
route.get('/tickets',
  checkIfAuthenticated, authorize(userTypes.ADMIN), adminControllers.getTickets);
route.patch('/tickets/:ticketId',
  checkIfAuthenticated, authorize(userTypes.ADMIN), adminControllers.assignTicket);
route.get('/tickets/report',
  checkIfAuthenticated, authorize(userTypes.ADMIN), adminControllers.getReport);


export default route;