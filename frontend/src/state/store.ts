import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './features/productsSlice/productsSlice';
import productDetailsReducer from './features/productDetailsSlice/productDetailsSlice';
import cartReducer from './features/cartSlice/cartSlice';
import loginReducer from './features/loginSlice/loginSlice';
import logoutReducer from './features/logoutSlice/logoutSlice';

const store = configureStore({
  reducer: {
    productsList: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: loginReducer,
    logoutStatus: logoutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
