import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDb = async () => {
  try {
    const mongoInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`MongoDb Connected ${mongoInstance.connection.host}`);
  } catch (error) {
    console.log('MongoDb Connection Failed', error);
    process.exit(1);
  }
};

export default connectDb;
