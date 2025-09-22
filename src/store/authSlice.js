import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'src/api/axiosInstance'
import { setSnackbarMessage } from './snackbarSlice' // Import the action from snackbarSlice

// export const getUserProfileAsync = createAsyncThunk(
//   'users/getUserProfile',
//   async (_, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await getUserProfile()

//       return response
//     } catch (error) {
//       // Dispatch error message with 'error' severity
//       const errorMessage = error.response?.data?.message || 'An error occurred'

//       dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))

//       return rejectWithValue(errorMessage)
//     }
//   }
// )

// export const updateUserProfileAsync = createAsyncThunk('users/updateUser/id', async user => {
//   const response = await updateUserProfile(user)

//   return response
// })
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post('wp-json/otp/v1/send', credentials)
      
      // Dispatch success message
      dispatch(setSnackbarMessage({ 
        message: response.data.message || 'OTP sent to email', 
        severity: 'success' 
      }))
      
      return response.data
    } catch (error) {
      // Get error message from response and strip HTML tags
      let errorMessage = error.response?.data?.message || 'Failed to send OTP'
      errorMessage = errorMessage.replace(/<[^>]+>/g, '') // Remove HTML tags

      // Dispatch snackbar error with 'error' severity
      dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))
      return rejectWithValue(errorMessage)
    }
  }
)

// Verify OTP API
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post('wp-json/otp/v1/verify', credentials)
      
      // Dispatch success message
      dispatch(setSnackbarMessage({ 
        message: 'Login successful!', 
        severity: 'success' 
      }))
      
      return response.data
    } catch (error) {
      // Get error message from response and strip HTML tags
      let errorMessage = error.response?.data?.message || 'Invalid OTP'
      if (error.response?.data?.code === 'invalid_otp') {
        errorMessage = 'OTP is invalid or expired'
      }
      errorMessage = errorMessage.replace(/<[^>]+>/g, '') // Remove HTML tags

      // Dispatch snackbar error with 'error' severity
      dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))
      return rejectWithValue(errorMessage)
    }
  }
)
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosInstance.post('wp-json/jwt-auth/v1/token', credentials)
    return response.data
  } catch (error) {
    // Get error message from response and strip HTML tags
    let errorMessage = error.response?.data?.message || 'An error occurred'
    errorMessage = errorMessage.replace(/<[^>]+>/g, '') // Remove HTML tags

    // Dispatch snackbar error with 'error' severity
    dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))
    return rejectWithValue(errorMessage)
  }
})

export const getAlgobrixBackersByEmail = createAsyncThunk(
  'auth/getAlgobrixBackersByEmail',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post('wp-json/zoho/v1/get-algobrix-backers', credentials)
      return response.data
    } catch (error) {
      // Get error message from response and strip HTML tags
      let errorMessage = error.response?.data?.message || 'An error occurred'
      errorMessage = errorMessage.replace(/<[^>]+>/g, '') // Remove HTML tags

      // Dispatch snackbar error with 'error' severity
      dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))
      return rejectWithValue(errorMessage)
    }
  }
)

// export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue, dispatch }) => {
//   try {
//     const response = await axiosInstance.post('/api/register', userData)

//     return response.data
//   } catch (error) {
//     // Dispatch error message with 'error' severity

//     const errorMessage = error.response?.data?.message || 'An error occurred'

//     dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))

//     return rejectWithValue(errorMessage)
//   }
// })

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    otpSent: false,
    sendingOtp: false,
    verifyingOtp: false
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
      state.otpSent = false
      state.sendingOtp = false
      state.verifyingOtp = false
    },
    resetOtpState: state => {
      state.otpSent = false
      state.sendingOtp = false
      state.verifyingOtp = false
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
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

      .addCase(getAlgobrixBackersByEmail.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAlgobrixBackersByEmail.fulfilled, (state, action) => {
        state.user = action.payload.user ? action.payload.user : null
        state.token = action.payload.token
        state.isAuthenticated = true
        state.isLoading = false
        state.error = null
        localStorage.setItem('accessToken', action.payload.token)
      })
      .addCase(getAlgobrixBackersByEmail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      // Send OTP cases
      .addCase(sendOtp.pending, state => {
        state.sendingOtp = true
        state.error = null
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otpSent = true
        state.sendingOtp = false
        state.error = null
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.sendingOtp = false
        state.error = action.payload
      })

      // Verify OTP cases
      .addCase(verifyOtp.pending, state => {
        state.verifyingOtp = true
        state.error = null
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.user = action.payload.user ? action.payload.user : null
        state.token = action.payload.token
        state.isAuthenticated = true
        state.verifyingOtp = false
        state.otpSent = false
        state.error = null
        localStorage.setItem('accessToken', action.payload.token)
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyingOtp = false
        state.error = action.payload
      })
  }
})

export const { setUser, logout, resetOtpState } = authSlice.actions

export const selectUser = state => state.auth.user
export const selectIsAuthenticated = state => state.auth.isAuthenticated

export default authSlice.reducer