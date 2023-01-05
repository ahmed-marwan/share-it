import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { logoutUser } from '../logoutSlice/logoutSlice';
import { updateUserProfile } from '../updateUserProfileSlice/updateUserProfileSlice';
import { UserProfile, UserProfileState } from './UserProfileSlice.model';

const initialState: UserProfileState = {
  status: 'idle',
  profile: undefined,
  error: undefined,
};

export const getUserProfile = createAsyncThunk('users/getProfile', async () => {
  try {
    const {
      data: { user },
    } = await axios.get<{ user: UserProfile }>('/api/v1/users/profile', {
      withCredentials: true,
    });

    return user;
  } catch (error: any) {
    const customError = {
      name: 'Custom error',
      message: error.response.data.message,
      data: error.response.data,
    };

    throw customError;
  }
});

export const userProfileSlice = createSlice({
  name: 'user profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.profile = undefined;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addMatcher(
        isAnyOf(getUserProfile.fulfilled, updateUserProfile.fulfilled),
        (state, action) => {
          state.status = 'succeeded';
          state.profile = action.payload;
          state.error = undefined;
        }
      );
  },
});

export default userProfileSlice.reducer;