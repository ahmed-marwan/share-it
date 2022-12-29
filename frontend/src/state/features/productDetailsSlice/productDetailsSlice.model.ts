import { IProduct } from '../../../shared/models/product.model';

export interface ProductDetailsState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  product: IProduct | undefined;
  error: string | undefined;
}