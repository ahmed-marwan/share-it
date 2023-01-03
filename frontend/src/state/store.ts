import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './features/productsSlice/productsSlice';
import productDetailsReducer from './features/productDetailsSlice/productDetailsSlice';
import cartReducer from './features/cartSlice/cartSlice';
import loginReducer from './features/loginSlice/loginSlice';
import logoutReducer from './features/logoutSlice/logoutSlice';
import registerReducer from './features/registerSlice/registerSlice';
import userProfileReducer from './features/userProfileSlice/userProfileSlice';
import updateUserProfileReducer from './features/updateUserProfileSlice/updateUserProfileSlice'
import updateUserPasswordReducer from './features/updateUserPasswordSlice/updateUserPasswordSlice'

const store = configureStore({
  reducer: {
    productsList: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    loginUser: loginReducer,
    logoutStatus: logoutReducer,
    registerUser: registerReducer,
    userProfile: userProfileReducer,
    updateUserProfile: updateUserProfileReducer,
    updateUserPassword: updateUserPasswordReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
