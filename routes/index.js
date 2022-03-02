import carts from '../components/carts/routes.js';
import products from '../components/products/routes.js';
import users from '../components/users/routes.js';
import orders from '../components/orders/routes.js'
import { isAuth } from '../utils/Auth.js';
import Products from '../components/products/model.js'
 import productsForIndexDTO from '../components/products/DTOs/productsForIndexDTO.js';
import logger from '../utils/winston.js'

export default (app) => {
  products(app);
  carts(app);
  app.use(users);
  app.use(orders);

  app.get('/', isAuth, async(req, res) => {
    const user = req.user
    try {
      const products = await Products.find({});
      const productsDTO = products.map(product => new productsForIndexDTO(product))
      res.render('index', { user, productsDTO })
    } catch (error) {
      logger.error(`Error al listar productos. ${error}`);
    }


  });

  app.get('*', (req, res) =>
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} método get no implementado`,
    })
  );
};
