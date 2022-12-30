import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import 'colors';
dotenv.config();

import connectDB from './db/connect';
import productRouter from './routes/productRoutes';
import authRouter from './routes/authRoutes';
import getErrorMessage from './errors/getErrorMessage';
import notFoundMiddleware from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/products', productRouter);
app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

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
