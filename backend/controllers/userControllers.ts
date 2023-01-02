import { Response } from 'express';
import User from '../models/User/User';
import attachCookiesToResponse from '../utils/attachCookiesToResponse';
import CustomError from '../errors';
import { AuthUser } from '../middlewares/auth/auth.model';

const showCurrentUser = async (req: AuthUser, res: Response) => {
  res.json({ user: req.user });
};

const updateUser = async (req: AuthUser, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new CustomError.BadRequestError(
      'Please provide a name and an email.'
    );
  }

  const user = await User.findOne({ _id: req.user!._id });

  user!.name = name;
  user!.email = email;
  await user!.save();

  const token = user!.genAuthToken();
  attachCookiesToResponse(res, token);

  res.json({ user: { _id: user!._id, name: user!.name } });
};

const updateUserPassword = async (req: AuthUser, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      'Please provide the old password and a new one.'
    );
  }

  const user = await User.findOne({ _id: req.user!._id });

  const isCorrectPassword = await user!.comparePassword(oldPassword);
  if (!isCorrectPassword) {
    throw new CustomError.UnauthorizedError('Invalid Credentials.');
  }

  user!.password = newPassword;
  await user!.save();

  res.json({ message: 'Password was updated successfully.' });
};

export { showCurrentUser, updateUser, updateUserPassword };