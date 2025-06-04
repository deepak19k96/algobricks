import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'src/api/axiosInstance'
import config from 'src/config/config'
import { setSnackbarMessage } from './snackbarSlice' // Import the action from snackbarSlice
/*
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve username from localStorage
      const storedUser = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
      const email = storedUser?.user_email

      if (!email) {
        return rejectWithValue('No username found in localStorage')
      }

      // Post to the user data API using axiosInstance
      const response = await axiosInstance.post(
        'wp-json/wl/v1/get_user_data',
        {
          email,
          AUTH_KEY: config.AUTH_KEY,
        }
      )

      return response.data
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Failed to fetch user data'
      return rejectWithValue(errorMessage)
    }
  }
)
 */

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (_, { rejectWithValue, dispatch }) => {
  try {
    // Retrieve username from localStorage
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    const email = storedUser?.Email

    if (!email) {
      return rejectWithValue('No username found in localStorage')
    }

    // Post to the user data API using axiosInstance
    const response = await axiosInstance.post('wp-json/zoho/v1/get-algobrix-backers', {
      email,
      AUTH_KEY: config.AUTH_KEY
    })

    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user data'
    dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))
    return rejectWithValue(errorMessage)
  }
})

const userDataSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
    isRedirect: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.loading = true
        state.error = null
        state.isRedirect = false
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.user
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isRedirect = true
      })
  }
})

export default userDataSlice.reducer
