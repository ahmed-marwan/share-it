import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from './cartSlice.model';

const initialState: CartState = {
  cartItems: [],
  cartItemsNumber: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cartItems.push(action.payload);
      state.cartItemsNumber += 1;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const updatedCart = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.cartItems = updatedCart;
      state.cartItemsNumber -= 1;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;