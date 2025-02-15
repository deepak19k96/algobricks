// src/pages/selectprogram/[id]/index.jsx (or wherever your component lives)
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, Tabs, Tab, Grid, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInstructions } from 'src/store/instructionsSlice' // Adjust the path as needed
import { fetchChildPages } from 'src/store/modelsSlice' // Adjust the path as needed
import { setBackgroundImageUrl } from 'src/store/uiSlice' // Import our new action
import UserLayout from 'src/layouts/UserLayout'

// TabPanel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

// Styled components for the card layout
const ModelCard = styled(Box)(({ theme }) => ({
  width: 185,
  borderRadius: 8,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  backgroundColor: '#fff',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}))

const LegoHeader = styled(Box)(({ background }) => ({
  height: 70,
  width: '100%',
  backgroundImage: background ? `url(${background})` : 'none',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const ModelImageContainer = styled(Box)(() => ({
  width: '100%',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const CodeFooter = styled(Box)(() => ({
  height: 65,
  width: '100%',
  backgroundColor: '#91B508',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

// Main Component
export default function SelectProgram() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()

  // Get instructions from Redux state
  const { items: instructions, loading: instructionsLoading } = useSelector(
    (state) => state.instructions
  )

  // Get models from Redux state
  const { items: models, loading: modelsLoading } = useSelector(
    (state) => state.models
  )

  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    if (id) {
      dispatch(fetchChildPages(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (!instructions || instructions.length === 0) {
      dispatch(fetchInstructions())
    }
  }, [dispatch, instructions])

  // Separate main and experimental models
  const mainModels = models.filter(item => !item?.acf?.experimental_model)
  const experimentalModels = models.filter(item => item?.acf?.experimental_model)

  // Show a loading indicator while fetching data
  if (modelsLoading || instructionsLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <img src="/images/loader.gif" alt="Loading..." style={{ width: 100, height: 100 }} />
      </Box>
    )
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // Compute the backgroundImageUrl from instructions data
  const firstChild = mainModels[0] || experimentalModels[0] || {}
  let lessonProgramRelation = ''
  if (firstChild.link) {
    const parts = firstChild.link.split('/')
    const idx = parts.indexOf('programsparent')
    if (idx !== -1 && parts.length > idx + 1) {
      lessonProgramRelation = parts[idx + 1]
    }
  }

  let backgroundImageUrl = ''
  let programLogoUrl = ''

  if (lessonProgramRelation && instructions && instructions.length > 0) {
    const matchingInstruction = instructions.find(inst =>
      inst.slug.toLowerCase().trim() === lessonProgramRelation.toLowerCase().trim()
    )
    if (matchingInstruction) {
      backgroundImageUrl = Array.isArray(matchingInstruction.program_desktop_backgroung)
        ? matchingInstruction.program_desktop_backgroung[0]
        : matchingInstruction.program_desktop_backgroung
    }
    if (matchingInstruction?.program_logo) {
      programLogoUrl = Array.isArray(matchingInstruction.program_logo)
        ? matchingInstruction.program_logo[0]
        : matchingInstruction.program_logo
    }
  }
  if (!backgroundImageUrl) {
    backgroundImageUrl = 'https://via.placeholder.com/1920x1080?text=No+Background+Image'
  }

  // Determine if we have any main or experimental models
  const hasMain = mainModels.length > 0
  const hasExperimental = experimentalModels.length > 0

  // Function to extract data from each model
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
    let lessonPassword = item.acf?.lesson_password || ''

    return {
      id: modelId,
      title: modelTitle,
      legoHeader,
      image,
      lessonPassword,
    }
  }

  // Render a model card. On click, store backgroundImageUrl in Redux and navigate.
  const renderModelCard = model => {
    const { id: modelId, title, legoHeader, image, lessonPassword } = extractModelData(model)

    const handleClick = () => {
      dispatch(setBackgroundImageUrl(backgroundImageUrl))
      router.push(`/selectprogram/${id}/${modelId}`)
    }

    return (
      <Grid item xs={1} key={modelId}>
        <ModelCard onClick={handleClick}>
          <LegoHeader background={legoHeader}>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#fff',
                fontWeight: 500,
                fontSize: 15,
                textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
                textAlign: 'center',
              }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </LegoHeader>
          <ModelImageContainer>
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </ModelImageContainer>
          <CodeFooter>
            <Stack direction="column" alignItems="center" spacing={-1}>
              <Typography
                variant="body1"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  mt: 1,
                }}
              >
                {lessonPassword}
              </Typography>
              <PlayArrowIcon sx={{ color: '#fff', fontSize: 40 }} />
            </Stack>
          </CodeFooter>
        </ModelCard>
      </Grid>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        marginTop: '60px',
        py: 4,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        {programLogoUrl && (
          <Box
            component="img"
            src={programLogoUrl}
            alt="Program Logo"
            sx={{ maxWidth: '200px', height: 'auto' }}
          />
        )}
      </Box>

      {hasMain && hasExperimental ? (
        <>
          <Box sx={{ mt: 4, pl: 2, pr: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                maxWidth: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto',
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
                    borderRadius: '5px 5px 0 0',
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              <Tab label="Main Models" />
              <Tab label="Experimental Models" />
            </Tabs>

            <Box
              sx={{
                height: '4px',
                backgroundColor: '#91B508',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                mt: '-4px',
              }}
            />
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Grid
              container
              columns={{ xs: 1, sm: 5 }}
              rowSpacing={8}
              columnSpacing={3}
              sx={{ maxWidth: 1200, margin: '0 auto' }}
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
              sx={{ maxWidth: 1200, margin: '0 auto' }}
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
          sx={{ maxWidth: 1200, margin: '0 auto', mt: 2 }}
        >
          {mainModels.map(renderModelCard)}
        </Grid>
      ) : hasExperimental ? (
        <Grid
          container
          columns={{ xs: 1, sm: 5 }}
          rowSpacing={8}
          columnSpacing={3}
          sx={{ maxWidth: 1200, margin: '0 auto', mt: 2 }}
        >
          {experimentalModels.map(renderModelCard)}
        </Grid>
      ) : (
        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            textAlign: 'center',
            mt: 4,
            textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
          }}
        >
          No models found.
        </Typography>
      )}
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