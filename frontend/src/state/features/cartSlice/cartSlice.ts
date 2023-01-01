import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../../shared/utils/utils';
import { CartItem, CartState } from './cartSlice.model';

const cartInLocalStorage = getItemFromLocalStorage('cart') as CartState;

const initialState: CartState = {
  cartItems: cartInLocalStorage?.cartItems || [],
  cartItemsNumber: cartInLocalStorage?.cartItemsNumber || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
      state.cartItemsNumber += 1;

      setItemInLocalStorage('cart', {
        cartItems: state.cartItems,
        cartItemsNumber: state.cartItemsNumber,
      });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const updatedCart = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      state.cartItems = updatedCart;
      state.cartItemsNumber -= 1;

      setItemInLocalStorage('cart', {
        cartItems: state.cartItems,
        cartItemsNumber: state.cartItemsNumber,
      });
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;