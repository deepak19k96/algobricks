// src/features/tickets/ticketsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchTicketsApi,
  addTicketApi,
  deleteTicketApi,
  deleteMultipleTicketsApi,
  modifyTicketApi,
  generateWalletLinkApi
} from 'src/api/ticketsApi'
import { setSnackbarMessage } from './snackbarSlice' // Import the action from snackbarSlice

// Async thunk for fetching tickets
export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async () => {
  const data = await fetchTicketsApi()

  return data
})

// Async thunk for adding a ticket
export const addTicket = createAsyncThunk('tickets/addTicket', async ticket => {
  const data = await addTicketApi(ticket)

  return data
})

// Async thunk for deleting a ticket
export const deleteTicket = createAsyncThunk(
  'tickets/deleteTicket',
  async (ticketId, { rejectWithValue, dispatch }) => {
    try {
      const response = await deleteTicketApi(ticketId)
      if (response?.success) {
        dispatch(setSnackbarMessage({ message: response.message, severity: 'success' }))

        return ticketId
      } else {
        dispatch(setSnackbarMessage({ message: response.message, severity: 'error' }))

        return rejectWithValue(response.message)
      }
    } catch (error) {
      // Dispatch error message with 'error' severity
      const errorMessage = error?.response?.data?.message || error.message || 'An error occurred'

      dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))

      return rejectWithValue(errorMessage)
    }
  }
)

// Async thunk for deleting a ticket
export const deleteMultipleTickets = createAsyncThunk(
  'tickets/deleteMultipleTickets',
  async (ticketIds, { rejectWithValue, dispatch }) => {
    try {
      const response = await deleteMultipleTicketsApi(ticketIds)

      if (response?.success) {
        dispatch(setSnackbarMessage({ message: response.message, severity: 'success' }))

        return ticketIds
      } else {
        dispatch(setSnackbarMessage({ message: response.message, severity: 'error' }))

        return rejectWithValue(response.message)
      }
    } catch (error) {
      // Dispatch error message with 'error' severity
      const errorMessage = error?.response?.data?.message || error.message || 'An error occurred'

      dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))

      return rejectWithValue(errorMessage)
    }
  }
)

// Async thunk for modifying a ticket
export const modifyTicket = createAsyncThunk('tickets/modifyTicket', async ({ id, ticket }) => {
  const data = await modifyTicketApi({ id, ticket })

  return data
})

export const generateWalletLink = createAsyncThunk(
  'tickets/generateWallet',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await generateWalletLinkApi(payload)
      if (response?.success) {
        return response.data
      } else {
        dispatch(setSnackbarMessage({ message: response.message, severity: 'error' }))

        return rejectWithValue(response.message)
      }
    } catch (error) {
      // Dispatch error message with 'error' severity
      const errorMessage = error?.response?.data?.message || error.message || 'An error occurred'

      dispatch(setSnackbarMessage({ message: errorMessage, severity: 'error' }))

      return rejectWithValue(errorMessage)
    }
  }
)

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    status: 'idle',
    WalletLinkStatus: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTickets.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tickets = action.payload
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(generateWalletLink.pending, state => {
        state.WalletLinkStatus = 'loading'
      })
      .addCase(generateWalletLink.fulfilled, (state, action) => {
        state.WalletLinkStatus = 'succeeded'
      })
      .addCase(generateWalletLink.rejected, (state, action) => {
        state.WalletLinkStatus = 'failed'
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload)
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        const ticketId = action.payload
        state.tickets = state.tickets.filter(ticket => ticket._id !== ticketId)
      })
      .addCase(deleteMultipleTickets.fulfilled, (state, action) => {
        const ticketIds = action.payload
        state.tickets = state.tickets.filter(ticket => !ticketIds.includes(ticket._id))
      })
      .addCase(modifyTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id)
        if (index !== -1) {
          state.tickets[index] = action.payload
        }
      })
  }
})

export default ticketsSlice.reducer
