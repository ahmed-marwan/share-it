import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  UpdateUserProfileState,
  UpdateUserProfile,
} from './updateUserProfileSlice.model';

const initialState: UpdateUserProfileState = {
  status: 'idle',
  updatedProfile: undefined,
  error: undefined,
};

export const updateUserProfile = createAsyncThunk(
  'users/updateProfile',
  async (userProfile: { name: string; email: string }) => {
    try {
      const {
        data: { user },
      } = await axios.patch<{ user: UpdateUserProfile }>(
        '/api/v1/users/profile',
        userProfile,
        { withCredentials: true }
      );

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

export const updateUserProfileSlice = createSlice({
  name: 'update user profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.updatedProfile = action.payload;
        state.error = undefined;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default updateUserProfileSlice.reducer;