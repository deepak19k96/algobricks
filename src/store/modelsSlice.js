import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'src/api/axiosInstance'

// Fetch child pages using the parent ID
export const fetchChildPages = createAsyncThunk(
  'models/fetchChildPages',
  async (parentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`wp-json/wp/v2/pages?parent=${parentId}&per_page=100`)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch child pages'
      return rejectWithValue(errorMessage)
    }
  }
)

const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChildPages.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChildPages.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchChildPages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default modelsSlice.reducer
