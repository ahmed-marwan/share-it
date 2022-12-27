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
    customError.message = `No item found with id: ${error.value}`;
  }

  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandler;