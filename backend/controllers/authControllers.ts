import { Request, Response } from 'express';
import User from '../models/User/User';
import CustomError from '../errors';

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists.');
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({ user });
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

  res.json({ user });
};

export { register, login };