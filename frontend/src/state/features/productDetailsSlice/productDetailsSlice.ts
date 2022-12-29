import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDetailsState } from './productDetailsSlice.model';
import { IProduct } from '../../../shared/models/product.model';

const initialState: ProductDetailsState = {
  status: 'idle',
  product: undefined,
  error: undefined,
};

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId: string | undefined) => {
    try {
      const {
        data: { product },
      } = await axios.get<{ product: IProduct }>(
        `/api/v1/products/${productId}`
      );

      return product;
    } catch (error: any) {
      const customError = {
        name: 'Custom error',
        message: error.response.data.message,
        data: error.response.data,
      };
      throw customError;
    }
  }
);

export const productDetailsSlice = createSlice({
  name: 'product details',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })

      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      });
  },
});

export default productDetailsSlice.reducer;