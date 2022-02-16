import Orders from './model.js';
import Products from '../products/model.js';
import moment from 'moment';
import logger from '../../utils/winston.js';
import { checkOutEMail } from '../../utils/mail.js';
import { checkOutSms, checkOutWhatsapp } from '../../utils/sms_whatsapp.js';

export async function checkOut(req, res) {
  const user = req.user;
  let { cart, mail } = user;
  try {
    const productsInCart = await Promise.all(
      cart.map(async (element) => {
        const product = await Products.findById(element.product);
        return {
          product: product.name,
          quantity: element.quantity,
        };
      })
    );
    const newOrder = new Orders({
      userName: user.name,
      products: productsInCart,
      userEmail: mail,
      date: moment(new Date()).format('DD/MM/YY HH:mm'),
      state: 'Generada',
    });
    user.cart = [];
    checkOutEMail(newOrder);
    checkOutSms(user.phone);
    checkOutWhatsapp(newOrder)
    await user.save();
    await newOrder.save();
    res.redirect('/orderSuccess');
  } catch (error) {
    logger.error(`Error al generar pedido. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function getUserOrder() {}

export async function getOrders() {}
