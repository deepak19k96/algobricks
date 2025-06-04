/* eslint-disable react-hooks/exhaustive-deps */
// context/UserProfileContext.js

import React, { createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getUserProfileAsync } from 'src/store/authSlice'

const UserProfileContext = createContext()

export const UserProfileProvider = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const userProfile = useSelector(state => state.auth.user)

  return <UserProfileContext.Provider value={userProfile}>{children}</UserProfileContext.Provider>
}
