import { Types } from 'mongoose';

export interface IOrder {
  orderItems: ISingleOrderItem[];
  status: string;
  deliverdAt?: Date;
  user: Types.ObjectId;
}

export interface ISingleOrderItem {
  name: string;
  image: string;
  typeOfShare: string;
  product: Types.ObjectId;
}