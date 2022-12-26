import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import 'colors';

import connectDB from './db/connect';
import productRouter from './routes/productRoutes';
import getErrorMessage from './errors/getErrorMessage';

const app = express();

app.use('/api/v1/products', productRouter);

const start = async () => {
  const PORT = process.env.PORT || 7000;

  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port: ${PORT}...`
          .yellow.bold
      )
    );
  } catch (error) {
    console.error(`Error: ${getErrorMessage(error)}`.red.underline.bold);
    process.exit(1);
  }
};

start();
