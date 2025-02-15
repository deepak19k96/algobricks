// src/store/uiSlice.js
import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    backgroundImageUrl: '',
  },
  reducers: {
    setBackgroundImageUrl: (state, action) => {
      state.backgroundImageUrl = action.payload
    },
  },
})

export const { setBackgroundImageUrl } = uiSlice.actions
export default uiSlice.reducer
