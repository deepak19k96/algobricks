import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import UserLayout from 'src/layouts/UserLayout'
import { fetchModelData } from 'src/store/modelSlice'

const SelectProgramModel = () => {
  const router = useRouter()
  const { modelId } = router.query
  const dispatch = useDispatch()

  // Get model data from Redux store
  const { modelData, galleryImages, loading, error } = useSelector(
    (state) => state.model
  )
  const backgroundImageUrl = useSelector((state) => state.ui.backgroundImageUrl)

  useEffect(() => {
    if (modelId) {
      dispatch(fetchModelData(modelId))
    }
  }, [modelId, dispatch])

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
              maxWidth: 900,
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
              <Typography variant="h6" sx={{ color: '#000' }}>
                No images found.
              </Typography>
            )}
          </Box>
        </Box>

        <style jsx>{`
          .my-gallery :global(.image-gallery-thumbnail) {
            border: 1px solid black;
            margin-right: 1px;
            padding: 2px;
            cursor: pointer;
          }
          .my-gallery :global(.image-gallery-thumbnail:last-child) {
            margin-right: 0;
          }
          .my-gallery :global(.image-gallery-thumbnails) {
            display: flex;
            gap: 10px;
          }
          .my-gallery :global(.image-gallery-thumbnail.active),
          .my-gallery :global(.image-gallery-thumbnail:hover) {
            border: 4px solid rgb(59, 122, 224);
          }
        `}</style>
      </Box>
    </UserLayout>
  )
}

export default SelectProgramModel
