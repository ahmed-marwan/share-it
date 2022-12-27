import mongoose, { Schema } from 'mongoose';
import { IProduct } from './product.model';

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name.'],
      maxLength: 50,
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide a product image.'],
    },
    brand: {
      type: String,
      trim: true,
    },
    typeOfShare: {
      type: String,
      required: [true, 'Please specify the type of sharing'],
      enum: ['to lend', 'to give away'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'neutral'],
      default: 'neutral',
    },
    condition: {
      type: String,
      required: [true, 'Please provide the condition of the product.'],
      enum: ['new', 'used - good condition', 'used - needs some repairs'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description.'],
      maxlength: 500,
      trim: true,
    },
    status: {
      type: String,
      enum: ['available', 'borrowed', 'given away'],
      default: 'available',
    },
    expectedReturnDate: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', ProductSchema);