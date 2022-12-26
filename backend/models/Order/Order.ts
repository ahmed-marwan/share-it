import mongoose, { Schema } from 'mongoose';
import { ISingleOrderItem, IOrder } from './order.model';

const SingleOrderItem = new Schema<ISingleOrderItem>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  typeOfShare: { type: String, required: true },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderItems: [SingleOrderItem],
    status: {
      type: String,
      enum: ['pending', 'failed', 'delivered', 'cancelled'],
      default: 'pending',
    },
    deliverdAt: {
      type: Date,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', OrderSchema);