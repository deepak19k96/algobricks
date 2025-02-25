import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, GlobalStyles } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

import DynamicUserLayout from 'src/@core/layouts/DynamicUserLayout'
import { fetchModelData } from 'src/store/modelSlice'
import { fetchInstructions } from 'src/store/instructionsSlice'
import { setBackgroundImageUrl } from 'src/store/uiSlice'
import { fetchUserData } from 'src/store/userDataSlice'

const SelectProgramModel = () => {
  const router = useRouter()
  const { id, modelId } = router.query
  const dispatch = useDispatch()

  const { data: userData, loading: userLoading, error: userError } = useSelector(
    (state) => state.user
  )
  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserData())
    }
  }, [userData, dispatch])
  useEffect(() => {
    if (id && userData && userData.package_data) {
      const allowedPackages = userData.package_data.map((p) => Number(p))
      if (!allowedPackages.includes(Number(id))) {
        // Redirect if the package id is not allowed
        router.replace('/buildinginstruction') // or any other route you'd prefer
      }
    }
  }, [id, userData, router])
  
  const { modelData, galleryImages, loading, error } = useSelector(
    state => state.model
  )
  const backgroundImageUrl = useSelector(state => state.ui.backgroundImageUrl)
  const { items: instructions } = useSelector(state => state.instructions)

  // Fetch model data
  useEffect(() => {
    if (modelId) {
      dispatch(fetchModelData(modelId))
    }
  }, [modelId, dispatch])

  // Fetch instructions once, then set background image
  useEffect(() => {
    if (modelData && !backgroundImageUrl) {
      if (!instructions || instructions.length === 0) {
        dispatch(fetchInstructions())
      } else {
        let lessonProgramRelation = ''
        if (modelData.link) {
          const parts = modelData.link.split('/')
          const idx = parts.indexOf('packages-parent')
          if (idx !== -1 && parts.length > idx + 1) {
            lessonProgramRelation = parts[idx + 1]
          }
        }

        let newBackgroundImageUrl = ''
        if (lessonProgramRelation) {
          const matchingInstruction = instructions.find(
            inst =>
              inst.slug.toLowerCase().trim() ===
              lessonProgramRelation.toLowerCase().trim()
          )
          if (matchingInstruction) {
            newBackgroundImageUrl = Array.isArray(
              matchingInstruction.package_desktop_background
            )
              ? matchingInstruction.package_desktop_background[0]
              : matchingInstruction.package_desktop_background
          }
        }
        if (!newBackgroundImageUrl) {
          newBackgroundImageUrl =
            'https://via.placeholder.com/1920x1080?text=No+Background+Image'
        }
        dispatch(setBackgroundImageUrl(newBackgroundImageUrl))
      }
    }
  }, [modelData, instructions, backgroundImageUrl, dispatch])

  if (loading) {
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

  if (error) {
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
          Error: {error}
        </Typography>
      </Box>
    )
  }

  // Format for react-image-gallery; optionally add an index overlay
 
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: 'calc(100vh - 60px)'
      }}
    >
      {/* Fixed background */}
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

      {/* Main slider container */}
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
                        {galleryImages && galleryImages.length > 0 ? (
              <ImageGallery
                items={galleryImages}
                showPlayButton={false}
                showFullscreenButton={true}
                thumbnailPosition="bottom"
                additionalClass="my-gallery"
              />
            ) : (
              <Typography variant="h6" sx={{ color: '#000' }}>
                No images found.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Custom thumbnail styling using styled-jsx (global) */}
        <GlobalStyles
  styles={{
    '.my-gallery .image-gallery-thumbnail': {
      border: '1px solid black',
      marginRight: '1px',
      padding: '2px',
      cursor: 'pointer',
    },
    '.my-gallery .image-gallery-thumbnail:last-child': {
      marginRight: '0',
    },
    '.my-gallery .image-gallery-thumbnails': {
      display: 'flex',
      gap: '10px',
    },
    '.my-gallery .image-gallery-thumbnail.active, .my-gallery .image-gallery-thumbnail:hover': {
      border: '4px solid rgb(59, 122, 224)',
    },
  }}
/>
      </Box>

  )
}

SelectProgramModel.getLayout = page => (
  <DynamicUserLayout>{page}</DynamicUserLayout>
)

export default SelectProgramModel
