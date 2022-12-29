export interface CartState {
  cartItems: CartItem[];
  cartItemsNumber: number;
}

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  status: string;
  requestStatus?: string;
}