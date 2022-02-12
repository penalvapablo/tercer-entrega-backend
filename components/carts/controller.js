import logger from '../../utils/winston.js';
import Cart from './model.js';
import moment from 'moment';

export async function getCartProducts(req, res) {
  try {
    // Cuando tenga USER, usar esta
    // const cartItems = await Cart.find({ user: req.user.id });

    const cartItems = await Cart.findById(req.params.id);
    return res.json(cartItems);
  } catch (error) {
    logger.error(`Error al obtener carrito. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

// const newCart = await Cart.create({
//   products: ["61bb4440fcc17ba8a80c3e7a", "61bb4440fcc17ba8a80c3e7c"],
//   timestamp: moment(new Date()).format(
//     'DD/MM/YY HH:mm'
//   )
// })
// await newCart.populate('products')

// console.log(newCart.products);
