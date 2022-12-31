import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginState, IUser } from './loginSlice.model';

const initialState: LoginState = {
  status: 'idle',
  user: undefined,
  error: undefined,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: { email: string; password: string }) => {
    try {
      const {
        data: { user },
      } = await axios.post<{ user: IUser }>('/api/v1/auth/login', loginData);

      return user;
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

export const loginSlice = createSlice({
  name: 'login user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = undefined;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
