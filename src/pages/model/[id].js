// src/pages/selectprogram/[id]/index.jsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, Tabs, Tab, Grid, Stack, useMediaQuery } from '@mui/material'
import { useTheme, styled } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChildPages } from 'src/store/modelsSlice'
import { setBackgroundImageUrl } from 'src/store/uiSlice'
import UserLayout from 'src/layouts/UserLayout'
import { fetchUserData } from 'src/store/userDataSlice'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

const ModelCard = styled(Box)(({ theme }) => ({
  width: 185,
  [theme.breakpoints.down('sm')]: {
    width: '60%',
    margin: 'auto'
  },
  borderRadius: 8,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  backgroundColor: '#fff',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)'
  }
}))

const LegoHeader = styled(Box)(({ theme, background }) => ({
  height: 70,
  [theme.breakpoints.down('sm')]: {
    height: 50
  },
  width: '100%',
  backgroundImage: background ? `url(${background})` : 'none',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const ModelImageContainer = styled(Box)({
  width: '100%',
  height: 130, // or whatever fixed height you want
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff'
})

const CodeFooter = styled(Box)(({ theme }) => ({
  height: 65,
  [theme.breakpoints.down('sm')]: {
    height: 80
  },
  width: '100%',
  backgroundColor: '#91B508',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

function SkeletonCard() {
  return (
    <ModelCard sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          height: 70,
          backgroundImage: 'url("/images/headerskelton.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Box
        sx={{
          height: 100,
          backgroundImage: 'url("/images/skeltonbody.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Box
        sx={{
          height: 65,
          backgroundImage: 'url("/images/skeltonfooter.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </ModelCard>
  )
}

export default function SelectProgram() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Redux state selectors (removed instructions from redux)
  const { items: models, loading: modelsLoading } = useSelector(state => state.models)

  const { data: userData } = useSelector(state => state.user)

  const [tabValue, setTabValue] = useState(0)
  useEffect(() => {
    if (!userData) {
      dispatch(fetchUserData())
    }
  }, [dispatch, userData])

  // Check package id authorization
  useEffect(() => {
    if (id && userData && userData.package_data) {
      const allowedPackageIds = userData.package_data.map(p => Number(p))
      if (!allowedPackageIds.includes(Number(id))) {
        router.replace('/buildinginstruction')
      }
    }
  }, [id, userData, router])
  useEffect(() => {
    if (id) {
      dispatch(fetchChildPages(id))
    }
  }, [id, dispatch])

  // Separate main and experimental models
  const mainModels = models.filter(item => !item?.acf?.experimental_model)
  const experimentalModels = models.filter(item => item?.acf?.experimental_model)

  const skeletonArray = Array.from({ length: 10 }, (_, i) => i)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Use the first object from the fetchChildPages data to extract background details and logo
  const firstChild = mainModels[0] || experimentalModels[0] || {}

  let backgroundImageUrl = isMobile
    ? Array.isArray(firstChild.package_mobile_background)
      ? firstChild.package_mobile_background[0]
      : firstChild.package_mobile_background
    : Array.isArray(firstChild.package_desktop_background)
    ? firstChild.package_desktop_background[0]
    : firstChild.package_desktop_background

  let programLogoUrl = Array.isArray(firstChild.package_logo) ? firstChild.package_logo[0] : firstChild.package_logo

  if (!backgroundImageUrl) {
    backgroundImageUrl = '/images/whitebg.jpeg'
  }

  const hasMain = mainModels.length > 0
  const hasExperimental = experimentalModels.length > 0

  // Extract model data for each model
  function extractModelData(item) {
    const modelId = item?.id
    const modelTitle = item?.title?.rendered || 'No Title'
    let legoHeader = ''
    if (Array.isArray(item.single_model_lego_color) && item.single_model_lego_color[0]) {
      legoHeader = item.single_model_lego_color[0]
    } else if (item.acf?.single_model_lego_color?.url) {
      legoHeader = item.acf.single_model_lego_color.url
    }
    let image = item.small_image || item.acf?.small_image?.url || '/images/placeholder.png'
    let lessonPassword = item.metadata?.model_password || ''

    return {
      id: modelId,
      title: modelTitle,
      legoHeader,
      image,
      lessonPassword
    }
  }

  const renderModelCard = model => {
    const { id: modelId, title, legoHeader, image } = extractModelData(model)

    const handleClick = () => {
      dispatch(setBackgroundImageUrl(backgroundImageUrl))
      router.push(`/model/${id}/${modelId}`)
    }

    return (
      <Grid item xs={1} key={modelId} sx={{ display: 'flex', justifyContent: 'center' }}>
        <ModelCard onClick={handleClick}>
          <LegoHeader background={legoHeader}>
            <Typography
              variant='subtitle1'
              sx={{
                color: '#fff',
                fontWeight: 500,
                fontSize: 15,
                textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
                textAlign: 'center'
              }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </LegoHeader>
          <ModelImageContainer>
            <Box
              component='img'
              src={image}
              alt={title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </ModelImageContainer>
          <CodeFooter>
            <Stack direction='column' alignItems='center' spacing={-1}>
              <PlayArrowIcon sx={{ color: '#fff', fontSize: 40 }} />
            </Stack>
          </CodeFooter>
        </ModelCard>
      </Grid>
    )
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#fff',
          backgroundImage: modelsLoading ? 'none' : `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
      />

      {/* Scrollable content layer */}
      <Box
        sx={{
          position: 'relative',
          marginTop: isMobile ? '0px' : '55px',
          py: 4
        }}
      >
        {/* Program Logo */}
        {/* Only show the logo when models are done loading */}
        {!modelsLoading && programLogoUrl && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box component='img' src={programLogoUrl} alt='Program Logo' sx={{ maxWidth: '200px', height: 'auto' }} />
          </Box>
        )}

        {/* Loading state: Show Skeleton Cards */}
        {modelsLoading && (
          <Grid
            container
            columns={{ xs: 1, sm: 5 }}
            rowSpacing={8}
            columnSpacing={3}
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: 1200 },
              margin: '0 auto',
              mt: 2
            }}
          >
            {skeletonArray.map(item => (
              <Grid item xs={1} key={item} sx={{ display: 'flex', justifyContent: 'center' }}>
                <SkeletonCard />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Actual Content */}
        {!modelsLoading && (
          <>
            {hasMain && hasExperimental ? (
              <>
                <Box sx={{ mt: 4, px: 2 }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                      maxWidth: '1200px',
                      margin: '0 auto',
                      '& .MuiTab-root': {
                        fontSize: '16px',
                        fontWeight: 600,
                        textTransform: 'none',
                        color: '#000',
                        minWidth: '150px',
                        padding: '12px 16px',
                        border: 'none',
                        transition: 'color 0.3s ease',
                        '&.Mui-selected': {
                          color: '#fff',
                          backgroundColor: '#91B508',
                          borderRadius: '5px 5px 0 0'
                        }
                      },
                      '& .MuiTabs-indicator': {
                        display: 'none'
                      }
                    }}
                  >
                    <Tab label='Main Models' />
                    <Tab label='Experimental Models' />
                  </Tabs>
                  <Box
                    sx={{
                      height: '4px',
                      backgroundColor: '#91B508',
                      width: '100%',
                      maxWidth: { xs: '100%', sm: 1200 },
                      margin: '0 auto',
                      mt: '-4px'
                    }}
                  />
                </Box>

                <TabPanel value={tabValue} index={0}>
                  <Grid
                    container
                    columns={{ xs: 1, sm: 5 }}
                    rowSpacing={8}
                    columnSpacing={3}
                    sx={{
                      width: '100%',
                      maxWidth: { xs: '100%', sm: 1200 },
                      margin: '0 auto'
                    }}
                  >
                    {mainModels.map(renderModelCard)}
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Grid
                    container
                    columns={{ xs: 1, sm: 5 }}
                    rowSpacing={8}
                    columnSpacing={3}
                    sx={{
                      width: '100%',
                      maxWidth: { xs: '100%', sm: 1200 },
                      margin: '0 auto'
                    }}
                  >
                    {experimentalModels.map(renderModelCard)}
                  </Grid>
                </TabPanel>
              </>
            ) : hasMain ? (
              <Grid
                container
                columns={{ xs: 1, sm: 5 }}
                rowSpacing={8}
                columnSpacing={3}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: 1200 },
                  margin: '0 auto',
                  mt: 2
                }}
              >
                {mainModels.map(renderModelCard)}
              </Grid>
            ) : hasExperimental ? (
              <Grid
                container
                columns={{ xs: 1, sm: 5 }}
                rowSpacing={8}
                columnSpacing={3}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: 1200 },
                  margin: '0 auto',
                  mt: 2
                }}
              >
                {experimentalModels.map(renderModelCard)}
              </Grid>
            ) : (
              <Typography
                variant='h6'
                sx={{
                  color: 'black',
                  textAlign: 'center',
                  mt: 4
                }}
              >
                Record not found!
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

SelectProgram.getLayout = page => {
  return (
    <UserLayout pageTitle='Select Model' showIcons>
      {page}
    </UserLayout>
  )
}
