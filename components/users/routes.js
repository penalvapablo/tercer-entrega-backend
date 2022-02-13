import { Router } from 'express';
import passport from 'passport';
import logger from '../../utils/winston.js';
import isRegistered from './utils/isRegistered.js';
import { signUp } from './controller.js';
import multer from './utils/multer.js';
import {isAuth, isNotAuth, isAdmin} from './utils/Auth.js';

const userRouter = new Router();


/**
 * -------------- POST ROUTES ----------------
 */

userRouter.post('/signup', multer.single('photo'), isRegistered, signUp);

userRouter.post('/login', passport.authenticate('local', { failureRedirect: '/login-error', successRedirect: '/index' }));


/**
 * -------------- GET ROUTES ----------------
 */


userRouter.get('/signup', isNotAuth, (req, res) => {
  res.render('signup');
});


userRouter.get('/login', isNotAuth, (req, res) => {
  res.render('login');
});


userRouter.get('/login-error', isNotAuth, (req, res) => {
  res.render('login-error');
});

userRouter.get('/logout', (req, res, next) => {
  req.logout();
  res.render('logout')
});



export default userRouter;
