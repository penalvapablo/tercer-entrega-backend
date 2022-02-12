import logger from '../../utils/winston.js';
import User from './model.js';
import bcrypt from 'bcrypt';

export async function signUp(req, res) {
  const newUser = new User(req.body);
  newUser.photo = req.file.filename;
  try {
    await newUser.save();

    res.redirect('/index');
  } catch (error) {
    logger.error(`Error al registrar usuario. ${error}`);
  }
}

export async function login(req, res) {
  try {
    const user = await User.findByCredentials(req.body.mail, req.body.password);
    if (user === 'no-user'){
      res.render('login-error-user')
    }
    if(user === 'no-pass'){
      res.render('login-error-password')
    }
    res.redirect('/index');
  } catch (error) {
    logger.error(`Error al loguear usuario ${error}`);
  }
}
