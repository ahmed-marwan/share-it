import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { IUser } from './user.model';

const UserSchema = new Schema<IUser>(
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
      minLength: 8,
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain the word"password."');
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);