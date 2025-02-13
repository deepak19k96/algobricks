// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateUserProfile, fetchUsers, fetchUsersWithId } from 'src/api/usersApi'

export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetchUsers()

  return response
})

export const fetchUsersWithIdAsync = createAsyncThunk('users/fetchUsersWithId', async id => {
  const response = await fetchUsersWithId(id)

  return response
})

export const swapUserAsync = createAsyncThunk('users/addUser', async user => {
  const response = await addUser(user)

  return response
})

export const addUserAsync = createAsyncThunk('users/addUser', async user => {
  const response = await addUser(user)

  return response
})

export const deleteUserAsync = createAsyncThunk('users/deleteUser', async userId => {
  const response = await deleteUser(userId)

  return response
})

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsersAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchUsersWithIdAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchUsersWithIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsersWithIdAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload)
      })
  }
})

export default userSlice.reducer
