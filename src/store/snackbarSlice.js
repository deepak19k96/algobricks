// slices/snackbarSlice.js
import { createSlice } from '@reduxjs/toolkit'

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    open: false,
    message: null,
    severity: null,
    autoHideDuration: 2000,
    key: null
  },
  reducers: {
    setSnackbarMessage: (state, action) => {
      state.open = true
      state.message = action.payload.message
      state.severity = action.payload.severity
      state.autoHideDuration = action.payload.autoHideDuration || 2000
      state.key = new Date().getTime()
    },
    closeSnackbar: (state) => {
      state.open = false
      // Don't clear message immediately to prevent flicker
    },
    clearSnackbarMessage: (state) => {
      // No action.payload needed - just reset to initial state
      state.open = false
      state.message = null
      state.severity = null
      state.key = null
    }
  }
})

export const { setSnackbarMessage, closeSnackbar, clearSnackbarMessage } = snackbarSlice.actions
export default snackbarSlice.reducer
