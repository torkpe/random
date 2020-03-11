import { Router } from 'express';
import { authController } from '../controllers';
import * as validator from '../middlewares/validation';

const route = Router();

route.post('/signup', validator.createUser, authController.createUser);
route.post('/login', validator.login, authController.login);

export default route;