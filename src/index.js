import dotenv from 'dotenv';
import express from 'express';
import connectDb from './db/index.js';

const app = express();

dotenv.config({
  path: './env',
});
console.log(process.env.PORT);

connectDb();

/*
import express from 'express';
import { DB_NAME } from './constants';

const app = express();
const port = process.env.PORT;

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on('error', (error) => {
      console.log('Error');
      throw error;
    });
    app.listen(port, () => {
      console.log(`App is running on Port ${port}`);
    });
  } catch (error) {
    console.log('something went wrong');
    throw error;
  }
})();
*/
