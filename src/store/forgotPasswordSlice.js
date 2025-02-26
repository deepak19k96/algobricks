// src/store/forgotPasswordSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'src/api/axiosInstance'
import config from 'src/config/config'

export const sendForgotPasswordRequest = createAsyncThunk(
  'forgotPassword/sendForgotPasswordRequest',
  async (user_email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        'wp-json/wl/v1/reset_password',
        {
          AUTH_KEY: config.AUTH_KEY, // from your config file
          user_email,
        }
      )
      return response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to send reset password link'
      return rejectWithValue(errorMessage)
    }
  }
)

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    message: '',
    error: null,
  },
  reducers: {
    clearForgotPasswordState: (state) => {
      state.loading = false
      state.message = ''
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendForgotPasswordRequest.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = ''
      })
      .addCase(sendForgotPasswordRequest.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload.message || 'Reset link sent to your email.'
      })
      .addCase(sendForgotPasswordRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearForgotPasswordState } = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer
