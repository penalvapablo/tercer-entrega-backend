import { Router } from 'express';
import { isAuth, isNotAuth, isAdmin } from '../../utils/Auth.js';
import { checkOut, getUserOrder,getOrders } from './controller.js';

const orderRouter = new Router();

orderRouter.post('/order', checkOut)

orderRouter.get('/order/:id', getUserOrder)

orderRouter.get('/order/list', getOrders)

orderRouter.get('/orderSuccess', (req, res)=>{
  res.render('orderSuccess')
})

export default orderRouter