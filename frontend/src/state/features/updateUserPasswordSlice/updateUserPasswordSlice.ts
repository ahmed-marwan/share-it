import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { UpdateUserPasswordState } from './updateUserPasswordSlice.model';

const initialState: UpdateUserPasswordState = {
  status: 'idle',
  error: undefined,
};

export const updateUserPassword = createAsyncThunk(
  'users/updatePassword',
  async (data: { oldPassword: string; newPassword: string }) => {
    try {
      await axios.patch('/api/v1/users//update-password', data, {
        withCredentials: true,
      });
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

export const updateUserPasswordSlice = createSlice({
  name: 'update user password',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateUserPassword.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(updateUserPassword.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = undefined;
      })

      .addCase(updateUserPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default updateUserPasswordSlice.reducer;