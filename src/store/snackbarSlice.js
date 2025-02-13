// slices/snackbarSlice.js
import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    message: null,
    severity: null
  },
  reducers: {
    setSnackbarMessage: (state, action) => {
      state.message = action.payload.message
      state.severity = action.payload.severity
    },
    clearSnackbarMessage: (state, action) => {
      state.message = action.payload.message
      state.severity = action.payload.severity
    }
  }
})

export const { setSnackbarMessage, clearSnackbarMessage } = snackbarSlice.actions

export default snackbarSlice.reducer
