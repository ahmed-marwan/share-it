import { IProduct } from "../../../shared/models/product.model";

export interface CurrentUserProductsState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    products: IProduct[]
    error: string | undefined;
}