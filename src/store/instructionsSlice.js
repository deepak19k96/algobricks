import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'src/api/axiosInstance'

export const fetchInstructions = createAsyncThunk(
  'instructions/fetchInstructions',
  async (useremail, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('wp-json/wp/v2/package', {
        params: { useremail },
      })
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch instructions'
      return rejectWithValue(errorMessage)
    }
  }
)

const instructionsSlice = createSlice({
  name: 'instructions',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructions.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchInstructions.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchInstructions.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default instructionsSlice.reducer
