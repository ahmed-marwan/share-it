import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeItemFromLocalStorage } from '../../../shared/utils/utils';
import { loginUser } from '../loginSlice/loginSlice';
import { LogoutState } from './logoutSlice.model';

const initialState: LogoutState = {
  status: 'idle',
  error: undefined,
};

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.get('/api/v1/auth/logout');

    removeItemFromLocalStorage('user');
  } catch (error: any) {
    const customError = {
      name: 'Custom error',
      message: error.response.data.message,
      data: error.response.data,
    };

    throw customError;
  }
});

export const logoutSlice = createSlice({
  name: 'logout user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = undefined;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(loginUser.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export default logoutSlice.reducer;
