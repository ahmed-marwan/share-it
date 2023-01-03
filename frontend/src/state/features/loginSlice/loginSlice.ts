import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '../../../shared/utils/utils';
import { logoutUser } from '../logoutSlice/logoutSlice';
import { registerUser } from '../registerSlice/registerSlice';
import { updateUserProfile } from '../updateUserProfileSlice/updateUserProfileSlice';
import { LoginState, IUser } from './loginSlice.model';

const userInLocalStorage = getItemFromLocalStorage('user') as IUser;

const initialState: LoginState = {
  status: 'idle',
  user: userInLocalStorage || undefined,
  error: undefined,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: { email: string; password: string }) => {
    try {
      const {
        data: { user },
      } = await axios.post<{ user: IUser }>('/api/v1/auth/login', loginData);

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

export const loginSlice = createSlice({
  name: 'login user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = undefined;
      })

      .addMatcher(
        isAnyOf(loginUser.fulfilled, registerUser.fulfilled, updateUserProfile.fulfilled),
        (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
          state.error = undefined;
        }
      );
  },
});

export default loginSlice.reducer;
