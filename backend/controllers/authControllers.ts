import { Request, Response } from 'express';
import User from '../models/User/User';
import CustomError from '../errors';
import attachCookiesToResponse from '../utils/attachCookiesToResponse';

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists.');
  }

  const user = await User.create({ name, email, password });
  const token = user.genAuthToken();
  attachCookiesToResponse(res, token);

  res.status(201).json({ user: { _id: user._id, name } });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      'Please provide an email and password.'
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthorizedError('Invalid Credentials.');
  }

  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new CustomError.UnauthorizedError('Invalid Credentials.');
  }

  const token = user.genAuthToken();
  attachCookiesToResponse(res, token);

  res.json({ user: { _id: user._id, name: user.name } });
};

export { register, login };
