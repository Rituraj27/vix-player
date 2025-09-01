import dotenv from 'dotenv';
import connectDb from './db/index.js';
import { app } from './app.js';

dotenv.config({
  path: './env',
});
console.log(process.env.PORT);

connectDb()
  .then(() => {
    console.log('Server connected successfully');
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
  });

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
