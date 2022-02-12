import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const PRIVATE_KEY = process.env.PRIVATE_KEY
console.log(PRIVATE_KEY)
import logger from '../../utils/winston.js';

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, require: true, trim: true},
  name: { type: String, require: true, trim: true },  
  phone: { type: String, require: true, trim: true },
  birthDate: {type: Date, require: true}, 
  address: { type: String, require: true, trim: true },
  photo: { type: String, require: true, trim: true },
  tokens: [{
    token: {
        type: String,
        required: true
    }
}]
});



// Statics son accesibles desde el model
userSchema.statics.findByCredentials = async (mail, password) => {
  const user = await User.findOne({ mail })
  if (!user) {
    return 'no-user'
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return 'no-pass'
  }

  return user
}


//Hash password before saving
userSchema.pre('save', async function (){
  const user = this
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 10);
  }
})

const User = mongoose.model('user', userSchema)

export default User;
