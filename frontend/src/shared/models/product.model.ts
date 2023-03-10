export interface IProduct {
  _id: string;
  name: string;
  image: string;
  brand: string;
  typeOfShare: string;
  gender: string;
  condition: string;
  description: string;
  status: string;
  requestStatus?: string;
  expectedReturnDate?: undefined;
  owner: string;
  createdAt: string;
}