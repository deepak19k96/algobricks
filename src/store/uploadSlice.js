import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from 'src/api/axiosInstance'

const initialState = {
  file: null,
  status: 'idle',
  error: null
}

export const uploadFile = createAsyncThunk('upload/uploadFile', async (file, { getState, rejectWithValue }) => {
  const state = getState()
  const userId = state.auth?.user?._id // Accessing the _id from the auth slice
  const formData = new FormData()
  formData.append('file', file)
  formData.append('userId', userId)

  const response = await axiosInstance.post(`/api/credential/upload-csv/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
})

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    resetUpload: state => {
      state.file = null
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(uploadFile.pending, state => {
        state.status = 'loading'
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.file = action.payload
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { resetUpload } = uploadSlice.actions

export default uploadSlice.reducer
