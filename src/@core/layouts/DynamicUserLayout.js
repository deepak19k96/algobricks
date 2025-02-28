// src/layouts/DynamicUserLayout.js
import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import UserLayout from 'src/layouts/UserLayout'

export default function DynamicUserLayout({ children }) {
  const router = useRouter()
  const { modelId } = router.query
  // Get the childPages (which holds all models for the package)
  const { items: childPages } = useSelector((state) => state.models)
  
  // Find the current model by comparing its id with the URL parameter
  const currentModel = childPages.find(
    (child) => Number(child.id) === Number(modelId)
  )
  
  // Extract the title from the current model (or fallback to an empty string)
  const title = currentModel?.title?.rendered || ''

  return (
    <UserLayout pageTitle={title} showIcons>
      {children}
    </UserLayout>
  )
}
