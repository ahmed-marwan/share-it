import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import productsReducer from './features/productsSlice/productsSlice';
import productDetailsReducer from './features/productDetailsSlice/productDetailsSlice';
import cartItemsReducer from './features/cartSlice/cartSlice';

const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, cartItemsReducer);

const store = configureStore({
  reducer: {
    productsList: productsReducer,
    productDetails: productDetailsReducer,
    cartItems: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

export default store;