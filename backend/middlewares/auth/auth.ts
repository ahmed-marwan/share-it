import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CustomError from '../../errors';
import { AuthUser, TokenInterface } from './auth.model';

const authenticateUser = (req: AuthUser, res: Response, next: NextFunction) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthorizedError('Invalid Authentication.');
  }

  try {
    const { _id, name } = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as TokenInterface;

    req.user = { _id, name };
    
    next();
  } catch (error) {
    throw new CustomError.UnauthorizedError('Invalid Authentication.');
  }
};

export default authenticateUser;