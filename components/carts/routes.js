import { Router } from 'express';
import { isAuth } from '../../utils/Auth.js';
import { getCartProducts, deleteProduct } from './controller.js';

const cartRouter = new Router();

export default (app) => {
  app.use('/cart', cartRouter);

  cartRouter.get('/', isAuth, getCartProducts);

  cartRouter.delete('/:id',isAuth, deleteProduct);

  // cartRouter.get('/list/:id', getProduct);

  // cartRouter.post('/create', createProduct);

  // cartRouter.put('/update/:id',updateProduct );

  // cartRouter.delete('/delete/:id', deleteProduct);
};
