import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import snackbarReducer from './snackbarSlice'
import uploadReducer from './uploadSlice'
import userReducer from './usersSlice'
import ticketReducer from './ticketsSlice'
import instructionsReducer from './instructionsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    instructions: instructionsReducer,

    snackbar: snackbarReducer,
    upload: uploadReducer,
    users: userReducer,
    tickets: ticketReducer
  }
})
