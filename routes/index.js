import carts from '../components/carts/routes.js';
import products from '../components/products/routes.js';
import users from '../components/users/routes.js';

export default (app) => {
  products(app);
  carts(app);

  app.use('/', users);

  app.get('/index', (req, res) => {
    res.render('index');
  });

  app.get('*', (req, res) =>
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} método get no implementado`,
    })
  );
};
