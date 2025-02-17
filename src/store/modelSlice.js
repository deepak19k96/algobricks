import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'src/api/axiosInstance'

// Async thunk to fetch model data by modelId
export const fetchModelData = createAsyncThunk(
  'model/fetchModelData',
  async (modelId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`wp-json/wp/v2/pages/${modelId}`)
      const data = response.data

      // Transform model_0_gallery images for react-image-gallery
      let galleryImages = []
      if (data.model_0_gallery && Array.isArray(data.model_0_gallery)) {
        galleryImages = data.model_0_gallery.map((url) => ({
          original: url,
          thumbnail: url,
        }))
      }

      // Return both the model data and the gallery images
      return { data, galleryImages }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch model data'
      return rejectWithValue(errorMessage)
    }
  }
)


const modelSlice = createSlice({
  name: 'model',
  initialState: {
    modelData: null,
    galleryImages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModelData.pending, (state) => {
        state.loading = true
        state.error = null
        state.modelData = null
        state.galleryImages = []
      })
      .addCase(fetchModelData.fulfilled, (state, action) => {
        state.loading = false
        state.modelData = action.payload.data
        state.galleryImages = action.payload.galleryImages
      })
      .addCase(fetchModelData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default modelSlice.reducer
