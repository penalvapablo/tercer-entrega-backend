import { Router } from 'express';
import {getCartProducts} from './controller.js'

const cartRouter = new Router();

export default (app) => {
  app.use('/cart', cartRouter);

  cartRouter.get('/products/:id', getCartProducts);

  // cartRouter.get('/list/:id', getProduct);

  // cartRouter.post('/create', createProduct);

  // cartRouter.put('/update/:id',updateProduct );

  // cartRouter.delete('/delete/:id', deleteProduct);
};
