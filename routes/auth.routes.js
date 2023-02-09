import { Router } from 'express';
import {
  handleNewUser,
  getUsers,
  login,
} from '../controllers/auth.controller.js';
import {
  isAdmin,
  isLoggedIn,
} from '../middleware/authentication/auth.middleware.js';
import { userCreationSchema } from '../middleware/validation/validation.js';
import validate from '../middleware/validation/validation.middleware.js';

const authenticationRouter = Router();

authenticationRouter.post(
  '/signup',
  validate(userCreationSchema),
  handleNewUser,
);
authenticationRouter.get('/all-users', [isLoggedIn, isAdmin], getUsers);
authenticationRouter.post('/login', login);

export default authenticationRouter;
