import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import snackbarReducer from './snackbarSlice'
import uploadReducer from './uploadSlice'
import userReducer from './usersSlice'
import ticketReducer from './ticketsSlice'
import instructionsReducer from './instructionsSlice'
import modelsReducer from './modelsSlice' // New slice
import uiReducer from './uiSlice' // <-- Import your ui slice reducer
import modelReducer from './modelSlice'   // New slice for model data


export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructions: instructionsReducer,
    models: modelsReducer,  // Add the new reducer
    model: modelReducer, // <-- Added here

    snackbar: snackbarReducer,
    upload: uploadReducer,
    users: userReducer,
    tickets: ticketReducer,
    ui: uiReducer, // <-- Add it here

  },
})

