import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Typography, Tabs, Tab, Grid, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInstructions } from 'src/store/instructionsSlice' // adjust path as needed

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

export default function SelectProgram() {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  // Get instructions from Redux state
  const { items: instructions, loading: instructionsLoading, error: instructionsError } = useSelector(
    state => state.instructions
  )

  const [loading, setLoading] = useState(true)

  const [mainModels, setMainModels] = useState([])
  const [experimentalModels, setExperimentalModels] = useState([])

  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    if (id) {
      fetchChildPages(id)
    }
  }, [id])

  useEffect(() => {
    if (!instructions || instructions.length === 0) {
      dispatch(fetchInstructions())
    }
  }, [dispatch, instructions])

  async function fetchChildPages(parentId) {
    try {
      setLoading(true)
      const response = await fetch(
        `https://online.youngengineers.org/db/wp-json/wp/v2/pages?parent=${parentId}&per_page=100`
      )
      const data = await response.json()

      const main = []
      const experimental = []
      data.forEach(item => {
        const isExperimental = item?.acf?.experimental_model
        if (isExperimental) {
          experimental.push(item)
        } else {
          main.push(item)
        }
      })

      setMainModels(main)
      setExperimentalModels(experimental)
    } catch (error) {
      console.error('Error fetching child pages:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || instructionsLoading) {
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

  const renderModelCard = model => {
    const { id: modelId, title, legoHeader, image, lessonPassword } = extractModelData(model)
    return (
      <Grid item xs={1} key={modelId}>
        <ModelCard>
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

  const hasMain = mainModels.length > 0
  const hasExperimental = experimentalModels.length > 0

  const firstChild = mainModels[0] || experimentalModels[0] || {};

  let lessonProgramRelation = '';
  if (firstChild.link) {
    const parts = firstChild.link.split('/');
    const idx = parts.indexOf('programsparent');
    if (idx !== -1 && parts.length > idx + 1) {
      lessonProgramRelation = parts[idx + 1];
    }
  }
  console.log('Lesson Program Relation:', lessonProgramRelation)
  console.log('Instructions:', instructions)

  let backgroundImageUrl = ''
  let programLogoUrl = '';

  if (lessonProgramRelation && instructions && instructions.length > 0) {
    const matchingInstruction = instructions.find(inst =>
      inst.slug.toLowerCase().trim() === lessonProgramRelation.toLowerCase().trim()
    )
    console.log('Matching Instruction:', matchingInstruction)
    if (matchingInstruction) {
      backgroundImageUrl = Array.isArray(matchingInstruction.program_desktop_backgroung)
        ? matchingInstruction.program_desktop_backgroung[0]
        : matchingInstruction.program_desktop_backgroung
    }
    if (matchingInstruction?.program_logo) {
        programLogoUrl = Array.isArray(matchingInstruction.program_logo)
          ? matchingInstruction.program_logo[0]
          : matchingInstruction.program_logo;
      }
      console.log('Program Logo:', programLogoUrl)
  }
  console.log('Computed backgroundImageUrl:', backgroundImageUrl)

  if (!backgroundImageUrl) {
    backgroundImageUrl = 'https://via.placeholder.com/1920x1080?text=No+Background+Image'
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Main Models" />
              <Tab label="Experimental Models" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <Grid
              container
              columns={5}
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
              columns={5}
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
          columns={5}
          rowSpacing={8}
          columnSpacing={3}
          sx={{ maxWidth: 1200, margin: '0 auto', mt: 2 }}
        >
          {mainModels.map(renderModelCard)}
        </Grid>
      ) : hasExperimental ? (
        <Grid
          container
          columns={5}
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
