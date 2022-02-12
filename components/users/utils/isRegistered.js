import Users from '../model.js';


export default async function isRegistered(req, res, next) {
  const { mail } = req.body;

  const exists = await Users.find({ mail: mail });
  if (exists.length) {
    res.render('signup-UsuarioRegistrado');
    return;
  }
  next();
}
