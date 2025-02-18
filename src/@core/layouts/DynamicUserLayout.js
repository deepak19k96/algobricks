// src/layouts/DynamicUserLayout.js
import React from 'react'
import { useSelector } from 'react-redux'
import UserLayout from 'src/layouts/UserLayout'

export default function DynamicUserLayout({ children }) {
  // read from Redux:
  const { modelData } = useSelector((state) => state.model)
  const title = modelData?.title?.rendered || ''

  return (
    <UserLayout pageTitle={title} showIcons>
      {children}
    </UserLayout>
  )
}
