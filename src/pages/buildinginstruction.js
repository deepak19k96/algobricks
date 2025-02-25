import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import { useRouter } from 'next/router'
import { fetchInstructions } from 'src/store/instructionsSlice'
import { fetchUserData } from 'src/store/userDataSlice'
import UserLayout from 'src/layouts/UserLayout'

const BuildingInstruction = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { items: instructions, loading: instructionsLoading, error: instructionsError } = useSelector((state) => state.instructions)
  const { data: userData, loading: userLoading, error: userError } = useSelector((state) => state.user)

  // Dispatch the user data fetch on mount
  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  // When user data is available, fetch instructions
  useEffect(() => {
    if (userData) {
      dispatch(fetchInstructions())
    }
  }, [dispatch, userData])

  // Convert package_data to numbers for filtering
  const userPackageData = userData?.package_data ? userData.package_data.map(Number) : []

  // Filter instructions based on user package data
  const filteredInstructions = instructions.filter((item) =>
    userPackageData.includes(item.id)
  )

  const combinedLoading = instructionsLoading || userLoading
  const combinedError = userError || instructionsError

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Fixed background layer */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: {
            xs: 'url("/images/mobilebgbuilding.jpg")',
            sm: 'url("/images/buildinginstruction.jpg")',
          },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1,
        }}
      />

      {/* Scrollable content layer */}
      <Box sx={{ position: 'relative', marginTop: { xs: '0px', sm: '80px' }, py: 4 }}>
        {/* Loader Overlay */}
        {combinedLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <img src="/images/loader.gif" alt="Loading..." style={{ width: 100, height: 100 }} />
          </Box>
        )}

        {/* Content Container */}
        <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', px: { xs: 2, md: 0 }, position: 'relative', zIndex: 5 }}>
          {combinedError && !combinedLoading && <div>Error: {combinedError}</div>}

          <Grid container rowSpacing={15} columnSpacing={10} justifyContent="center">
            {filteredInstructions.map((item) => (
              <Grid item key={item.id} sx={{ mx: { xs: 'auto', sm: 0 } }}>
                <Card
                  onClick={() => router.push(`/model/${item.id}`)}
                  sx={{
                    width: { xs: 280, sm: 320 },
                    height: { xs: 220, sm: 230 },
                    boxShadow: '0 15px 8px rgba(0, 0, 0, 0.15), 0 10px 25px rgba(0, 0, 0, 0.15)',
                    borderRadius: 0,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      cursor: 'pointer',
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  {/* LEGO Header */}
                  <Box
                    sx={{
                      position: 'relative',
                      height: 60,
                      backgroundImage: `url(${item.lego_long || ''})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '14px',
                        textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
                        whiteSpace: 'nowrap',
                      }}
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    />
                  </Box>

                  {/* Package Logo */}
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: { xs: 160, sm: 170 },
                      backgroundColor: '#F5F5F5',
                      padding: '14px',
                    }}
                  >
                    <img
                      src={item.package_logo ? item.package_logo[0] : 'https://via.placeholder.com/150'}
                      alt={item.title.rendered}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}

BuildingInstruction.getLayout = (page) => {
  return <UserLayout pageTitle="Select Package">{page}</UserLayout>
}

export default BuildingInstruction
