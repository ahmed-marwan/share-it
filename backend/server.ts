import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import productRouter from './routes/productRoutes';

const app = express();

app.use('/api/v1/products', productRouter);

const start = () => {
  const PORT = process.env.PORT || 7000;

  try {
    // Connect to DB
    app.listen(PORT, () =>
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port: ${PORT}...`
      )
    );
  } catch (error) {
    console.error(error);
  }
};

start();
