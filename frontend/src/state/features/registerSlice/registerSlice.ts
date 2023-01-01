import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../../shared/utils/utils';
import { logoutUser } from '../logoutSlice/logoutSlice';
import { RegisterState, RegisterData, IUser } from './registerSlice.model';

const userInLocalStorage = getItemFromLocalStorage('user') as IUser;

const initialState: RegisterState = {
  status: 'idle',
  user: userInLocalStorage || undefined,
  error: undefined,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterData) => {
    try {
      const {
        data: { user },
      } = await axios.post<{ user: IUser }>(
        '/api/v1/auth/register',
        registerData
      );

      setItemInLocalStorage('user', user);

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

export const registerSlice = createSlice({
  name: 'register user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = undefined;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = undefined;
      });
  },
});

export default registerSlice.reducer;