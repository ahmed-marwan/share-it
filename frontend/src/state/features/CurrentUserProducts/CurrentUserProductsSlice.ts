import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../../shared/models/product.model';
import { catchCustomError } from '../../../shared/utils/utils';
import { logoutUser } from '../logoutSlice/logoutSlice';
import { CurrentUserProductsState } from './CurrentUserProducts.model';

const initialState: CurrentUserProductsState = {
  status: 'idle',
  products: [],
  error: undefined,
};

export const getCurrentUserProducts = createAsyncThunk(
  'products/getCurrentUserProducts',
  async () => {
    try {
      const {
        data: { products },
      } = await axios.get<{ products: IProduct[] }>(
        '/api/v1/products/myproducts',
        { withCredentials: true }
      );

      return products;
    } catch (error: any) {
      throw catchCustomError(error);
    }
  }
);

export const currentUserProductsSlice = createSlice({
  name: 'current user products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = [];
      })

      .addCase(getCurrentUserProducts.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getCurrentUserProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.error = undefined;
      })

      .addCase(getCurrentUserProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default currentUserProductsSlice.reducer;