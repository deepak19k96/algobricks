import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, GlobalStyles } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

// Layouts / Redux actions
import DynamicUserLayout from 'src/@core/layouts/DynamicUserLayout'
import { fetchUserData } from 'src/store/userDataSlice'
import { fetchChildPages } from 'src/store/modelsSlice'
import { setBackgroundImageUrl } from 'src/store/uiSlice'

const SelectProgramModel = () => {
  const router = useRouter()
  const { id, modelId } = router.query
  const dispatch = useDispatch()
  const [currentIndex, setCurrentIndex] = useState(0)
  const galleryRef = useRef(null)

  const { data: userData, loading: userLoading, error: userError } = useSelector(
    (state) => state.user
  )

  const {
    items: childPages,
    loading: childPagesLoading,
    error: childPagesError
  } = useSelector((state) => state.models)
  const backgroundImageUrl = useSelector((state) => state.ui.backgroundImageUrl)

  // 1. Fetch user data if not loaded
  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserData())
    }
  }, [userData, dispatch])

  // 2. Fetch child pages (models) for the given package id
  useEffect(() => {
    if (id) {
      dispatch(fetchChildPages(id))
    }
  }, [id, dispatch])

  // Show loader until user and childPages data is ready
  const allLoading = userLoading || childPagesLoading
  if (allLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <img
          src="/images/loader.gif"
          alt="Loading..."
          style={{ width: 100, height: 100 }}
        />
      </Box>
    )
  }

  if (userError || childPagesError) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Typography variant="h6" sx={{ color: 'red' }}>
          {userError || childPagesError}
        </Typography>
      </Box>
    )
  }

  // Check if the current package is allowed for the user
  if (userData && userData.package_data) {
    const allowedPackages = userData.package_data.map((p) => Number(p))
    if (!allowedPackages.includes(Number(id))) {
      router.replace('/buildinginstruction')

      return null

    }
  } else {
    return null
  }

  // Find the current model from childPages using modelId from URL
  const currentModel = childPages.find(
    (child) => Number(child.id) === Number(modelId)
  )

  if (!currentModel) {
    router.replace(`/model/${id}`)

    return null
  }

  // Build gallery images from model_0_gallery field
  // (Assuming model_0_gallery is already an array of image URLs)
  const galleryImages =
    currentModel.model_0_gallery && Array.isArray(currentModel.model_0_gallery)
      ? currentModel.model_0_gallery.map((url) => ({
          original: url,
          thumbnail: url
        }))
      : []

  if (!backgroundImageUrl) {
    
    const isMobile = false 

    let newBackgroundImageUrl = isMobile
      ? Array.isArray(currentModel.package_mobile_background)
        ? currentModel.package_mobile_background[0]
        : currentModel.package_mobile_background
      : Array.isArray(currentModel.package_desktop_background)
      ? currentModel.package_desktop_background[0]
      : currentModel.package_desktop_background

    if (!newBackgroundImageUrl) {
      newBackgroundImageUrl =
        'https://via.placeholder.com/1920x1080?text=No+Background+Image'
    }
    dispatch(setBackgroundImageUrl(newBackgroundImageUrl))
  }

  const handleSlide = (index) => {
    setCurrentIndex(index)
  }

  const computedSwipeThreshold =
    galleryImages &&
    galleryImages.length > 0 &&
    (currentIndex === 0 || currentIndex === galleryImages.length - 1)
      ? 100000
      : 100

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 60px)'
      }}
    >
      {/* Fixed Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1
        }}
      />

      {/* Main Slider Container */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: { xs: '40px', md: '80px' },
          px: { xs: 2, md: 0 }
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '90%', md: '700px' },
            maxWidth: '700px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }}
        >
          {galleryImages.length > 0 ? (
            <ImageGallery
              items={galleryImages}
              showPlayButton={false}
              showFullscreenButton={true}
              thumbnailPosition="bottom"
              additionalClass="my-gallery"
              infinite={false}
            />
          ) : (
            <Typography variant="h6" sx={{ color: '#000' }}>
              No images found.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Custom Thumbnail Styling */}
      <GlobalStyles
  styles={{
    '.my-gallery .image-gallery-thumbnail': {
      border: '1px solid black',
      marginRight: '1px',
      padding: '2px',
      cursor: 'pointer'
    },
    '.my-gallery .image-gallery-thumbnail:last-child': {
      marginRight: '0'
    },
    '.my-gallery .image-gallery-thumbnails': {
      display: 'flex',
      gap: '10px'
    },
    '.my-gallery .image-gallery-thumbnail.active, .my-gallery .image-gallery-thumbnail:hover': {
      border: '4px solid rgb(59, 122, 224)'
    },
    '.image-gallery-content.fullscreen': {
      backgroundColor: '#fff !important' // White background in fullscreen mode
    },
    '.image-gallery-slide': {
      backgroundColor: '#fff !important' // Ensures individual slides have a white background
    },
    '.image-gallery-image': {
      backgroundColor: '#fff !important', // Ensures images don't show black transparency
      padding: '10px' // Adds a little padding so images are not touching edges
    }
  }}
/>
    </Box>
  )
}

SelectProgramModel.getLayout = (page) => (
  <DynamicUserLayout>{page}</DynamicUserLayout>
)

export default SelectProgramModel
