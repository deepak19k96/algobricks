import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'src/api/axiosInstance'
import { setSnackbarMessage } from './snackbarSlice' // Import the action from snackbarSlice

import { getUserProfile, updateUserProfile } from 'src/api/usersApi'

export const getUserProfileAsync = createAsyncThunk(
  'users/getUserProfile',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await getUserProfile()

      return response
    } catch (error) {
      // Dispatch error message with 'error' severity
      const errorMessage = error.response?.data?.message || 'An error occurred'

      dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))

      return rejectWithValue(errorMessage)
    }
  }
)

export const updateUserProfileAsync = createAsyncThunk('users/updateUser/id', async user => {
  const response = await updateUserProfile(user)

  return response
})

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance.post('db/wp-json/jwt-auth/v1/token', credentials)

    return response.data
  } catch (error) {
    // Dispatch error message with 'error' severity
    const errorMessage = error.response?.data?.message || 'An error occurred'

    dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))

    return rejectWithValue(errorMessage)
  }
})

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance.post('/api/register', userData)

    return response.data
  } catch (error) {
    // Dispatch error message with 'error' severity

    const errorMessage = error.response?.data?.message || 'An error occurred'

    dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))

    return rejectWithValue(errorMessage)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    logout: state => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUserProfileAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUserProfileAsync.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = true
        state.isLoading = false
        state.error = null
      })
      .addCase(getUserProfileAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(updateUserProfileAsync.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = true
        state.isLoading = false
        state.error = null
      })
      .addCase(updateUserProfileAsync.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(login.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.isLoading = false
        state.error = null
        localStorage.setItem('accessToken', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(registerUser.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        state.isAuthenticated = true
        state.isLoading = false
        state.error = null
        localStorage.setItem('accessToken', action.payload.token)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { setUser, logout } = authSlice.actions

export const selectUser = state => state.auth.user

export const selectIsAuthenticated = state => state.auth.isAuthenticated

export default authSlice.reducer
