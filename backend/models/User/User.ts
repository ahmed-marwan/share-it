import { Model, Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser, IUserMethods } from './user.model';

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name.'],
      minLength: 3,
      maxLength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      unique: true,
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error('Please provide a valid email.');
        }
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      minLength: [8, 'Password has to be at least 8 characters.'],
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain the word: "password".');
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (insertedPassword: string) {
  const isMatch = await bcrypt.compare(insertedPassword, this.password);
  return isMatch;
};

UserSchema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFE_TIME,
  });
};

export default model<IUser, UserModel>('User', UserSchema);