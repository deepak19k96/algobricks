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
      // .addCase(getUserProfileAsync.pending, state => {
      //   state.isLoading = true
      //   state.error = null
      // })
      // .addCase(getUserProfileAsync.fulfilled, (state, action) => {
      //   state.user = action.payload.user
      //   state.isAuthenticated = true
      //   state.isLoading = false
      //   state.error = null
      // })
      // .addCase(getUserProfileAsync.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.error = action.error.message
      // })
      // .addCase(updateUserProfileAsync.pending, state => {
      //   state.isLoading = true
      //   state.error = null
      // })
      // .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
      //   state.user = action.payload.user
      //   state.isAuthenticated = true
      //   state.isLoading = false
      //   state.error = null
      // })
      // .addCase(updateUserProfileAsync.rejected, (state, action) => {
      //   state.isLoading = false
      //   state.error = action.error.message
      // })
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
  }
})

export const { setUser, logout } = authSlice.actions

export const selectUser = state => state.auth.user

export const selectIsAuthenticated = state => state.auth.isAuthenticated

export default authSlice.reducer
