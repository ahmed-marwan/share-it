import { Request, Response, NextFunction } from 'express';
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: error.statusCode || 500,
    message: error.message || 'Something went wrong, please try again later',
  };

  if (error.name === 'CastError') {
    customError.statusCode = 404;
    customError.message = `Not found: no product with id ${error.value}`;
  }

  if (error.name === 'ValidationError') {
    const errors: any[] = Object.values(error.errors);

    customError.statusCode = 400;
    customError.message = errors.map((error) => error.message).join(' ');
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandler;