import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice/productsSlice';
import productDetailsReducer from './features/productDetailsSlice/productDetailsSlice';
const store = configureStore({
  reducer: {
    productsList: productsReducer,
    productDetails: productDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;