import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import snackbarReducer from './snackbarSlice'

import instructionsReducer from './instructionsSlice'
import modelsReducer from './modelsSlice' // New slice
import uiReducer from './uiSlice' // <-- Import your ui slice reducer
import modelReducer from './modelSlice'   // New slice for model data
import userDataReducer from './userDataSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructions: instructionsReducer,
    models: modelsReducer,  // Add the new reducer
    model: modelReducer, // <-- Added here
    user: userDataReducer,

    snackbar: snackbarReducer,

    ui: uiReducer, // <-- Add it here

  },
})

