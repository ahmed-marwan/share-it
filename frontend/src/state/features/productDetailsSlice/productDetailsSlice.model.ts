import { IProduct } from '../../../shared/models/product.model';

export interface ProductDetailsState {
  status: 'loading' | 'succeeded' | 'failed';
  product: IProduct | undefined;
  error: string | undefined;
}