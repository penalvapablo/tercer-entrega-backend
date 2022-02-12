import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
const MONGO_DB = process.env.MONGO_DB_URI


export default await mongoose.connect(`${MONGO_DB}`);

