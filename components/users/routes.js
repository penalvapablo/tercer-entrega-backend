import { Router } from 'express';
import logger from '../../utils/winston.js';
import isRegistered from './utils/isRegistered.js';
import { signUp, login } from './controller.js';
import multer from './utils/multer.js';

const userRouter = new Router();

userRouter.get('/signup', (req, res) => {
  res.render('signup');
});

userRouter.post('/signup', multer.single('photo'), isRegistered, signUp);

userRouter.get('/login', (req, res) => {
  res.render('login');
});

userRouter.post('/login', login);

export default userRouter;
