import Joi from 'joi';
import mongoose from 'mongoose';


const cartSchema = mongoose.Schema({
  // const user = {type: mongoose.Schema.ObjectId, ref: 'user'}
  products : [{type: mongoose.Schema.ObjectId, ref: 'products'}],
  timestamp : Joi.string().min(4).required()

})

export default mongoose.model('cart', cartSchema)



