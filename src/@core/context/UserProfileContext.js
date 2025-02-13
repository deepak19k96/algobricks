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

  useEffect(() => {
    const excludedRoutes = ['/pages/register', '/pages/login', '/secure-wallet']
    if (excludedRoutes.includes(router.pathname)) {
      return
    }

    if (
      localStorage?.getItem('accessToken') !== '' &&
      (userProfile?.email === null || userProfile?.email === undefined)
    ) {
      dispatch(getUserProfileAsync())
    } else {
      router.push('/pages/login')
    }
  }, [userProfile, dispatch])

  return <UserProfileContext.Provider value={userProfile}>{children}</UserProfileContext.Provider>
}
