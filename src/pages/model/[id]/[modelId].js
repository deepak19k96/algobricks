import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, GlobalStyles } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import UserLayout from 'src/layouts/UserLayout'
import { fetchModelData } from 'src/store/modelSlice'
import { fetchInstructions } from 'src/store/instructionsSlice'
import { setBackgroundImageUrl } from 'src/store/uiSlice'

const SelectProgramModel = () => {
  const router = useRouter()
  const { modelId } = router.query
  const dispatch = useDispatch()

  // Get model data from Redux store
  const { modelData, galleryImages, loading, error } = useSelector(
    (state) => state.model
  )
  const backgroundImageUrl = useSelector((state) => state.ui.backgroundImageUrl)
  const { items: instructions } = useSelector((state) => state.instructions)

  // Fetch model data
  useEffect(() => {
    if (modelId) {
      dispatch(fetchModelData(modelId))
    }
  }, [modelId, dispatch])

  // If background image is empty (e.g. after a refresh), try to fetch instructions
  // and compute the background image based on modelData.link
  useEffect(() => {
    if (modelData && !backgroundImageUrl) {
      // If instructions haven't been fetched yet, dispatch the fetch
      if (!instructions || instructions.length === 0) {
        dispatch(fetchInstructions())
      } else {
        // Extract the slug from modelData.link
        let lessonProgramRelation = ''
        if (modelData.link) {
          const parts = modelData.link.split('/')
          const idx = parts.indexOf('packages-parent')
          if (idx !== -1 && parts.length > idx + 1) {
            lessonProgramRelation = parts[idx + 1]
          }
        }

        // Find a matching instruction using the extracted slug
        let newBackgroundImageUrl = ''
        if (lessonProgramRelation) {
          const matchingInstruction = instructions.find(
            (inst) =>
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

        // Fallback if no valid background image is found
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
          minHeight: '100vh',
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
          minHeight: '100vh',
        }}
      >
        <Typography variant="h6" sx={{ color: 'red' }}>
          Error: {error}
        </Typography>
      </Box>
    )
  }

  return (
    <UserLayout pageTitle={modelData?.title?.rendered || ''} showIcons>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: 'calc(100vh - 60px)', // Adjust for header height
          pt: '20px', // Padding top to account for header
        }}
      >
        {/* Fixed background Box */}
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
            zIndex: -1,
          }}
        />

        {/* Content container */}
        <Box sx={{ py: 4, px: 2 }}>
          <Box
            sx={{
              maxWidth: { xs: '100%', sm: 600 },
              margin: '0 auto',
              backgroundColor: '#fff',
              p: 0,
              borderRadius: 0,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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
              <Typography variant="h6" sx={{ color: '#000', p: 2 }}>
                No images found.
              </Typography>
            )}
          </Box>
        </Box>

        {/* Global thumbnail styling with media queries for responsiveness */}
        <GlobalStyles
          styles={{
            '.my-gallery .image-gallery-thumbnail': {
              border: '1px solid black',
              marginRight: '1px',
              padding: '2px',
              cursor: 'pointer',
            },
            '.my-gallery .image-gallery-thumbnail:last-child': {
              marginRight: 0,
            },
            '.my-gallery .image-gallery-thumbnails': {
              display: 'flex',
              gap: '10px',
              flexWrap: 'nowrap',
            },
            '.my-gallery .image-gallery-thumbnail.active, .my-gallery .image-gallery-thumbnail:hover': {
              border: '4px solid rgb(59, 122, 224)',
            },
            '@media (max-width:600px)': {
              '.my-gallery .image-gallery-thumbnails': {
                flexWrap: 'wrap',
                justifyContent: 'center',
              },
              '.my-gallery .image-gallery-thumbnail': {
                marginRight: '5px',
              },
            },
          }}
        />
      </Box>
    </UserLayout>
  )
}

export default SelectProgramModel
