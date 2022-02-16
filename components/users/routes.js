import { Router } from 'express';
import passport from 'passport';
import isRegistered from './utils/isRegistered.js';
import { signUp } from './controller.js';
import multer from './utils/multer.js';
import { isAuth, isNotAuth, isAdmin } from '../../utils/Auth.js';

const userRouter = new Router();

/**
 * -------------- POST ROUTES ----------------
 */

userRouter.post('/signup', multer.single('photo'), isRegistered, signUp);

userRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login-error',
    successRedirect: '/',
  })
);

/**
 * -------------- GET ROUTES ----------------
 */

userRouter.get('/signup', isNotAuth, (req, res) => {
  res.render('signup');
});

userRouter.get('/login', isNotAuth, (req, res) => {
  res.render('login');
});

userRouter.get('/profile', isAuth, (req, res) => {
  const user = req.user;
  res.render('profile',{ user});
});

userRouter.get('/login-error', isNotAuth, (req, res) => {
  res.render('login-error');
});

userRouter.get('/logout', (req, res, next) => {
  req.logout();
  res.render('logout');
});

export default userRouter;
