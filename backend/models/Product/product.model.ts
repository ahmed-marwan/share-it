import { Types } from "mongoose";

export interface IProduct {
  name: string;
  image: string;
  brand?: string;
  typeOfShare: string;
  gender?: string;
  condition: string;
  description: string;
  status: string;
  requestStatus?: string;
  expectedReturnDate?: undefined;
  owner: Types.ObjectId;
}