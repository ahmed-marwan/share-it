import { IProduct } from "../../../shared/models/product.model";

export interface ProductsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  products: IProduct[];
  error: string | undefined;
}