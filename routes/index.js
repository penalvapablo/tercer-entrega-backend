import carts from '../components/carts/routes.js';
import products from '../components/products/routes.js';
import users from '../components/users/routes.js';
import { isAuth } from '../components/users/utils/Auth.js';

export default (app) => {
  products(app);
  carts(app);

  app.use('/', users);

  app.get('/index', isAuth, (req, res) => {
    const user = req.user
    res.render('index', { user });
  });

  app.get('*', (req, res) =>
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} método get no implementado`,
    })
  );
};
