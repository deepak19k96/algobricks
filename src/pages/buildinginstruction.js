import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import { useRouter } from 'next/router'
import { fetchInstructions } from 'src/store/instructionsSlice'
import UserLayout from 'src/layouts/UserLayout'

const BuildingInstruction = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { items: instructions, loading, error } = useSelector(state => state.instructions)
  const [userEmail, setUserEmail] = useState(null)

  // Retrieve the user email from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    if (storedUser && storedUser.Email) {
      setUserEmail(storedUser.Email)
    }
  }, [])

  // Once the email is available, fetch the packages using that email
  useEffect(() => {
    if (userEmail) {
      dispatch(fetchInstructions(userEmail))
    }
  }, [dispatch, userEmail])

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
            sm: 'url("/images/buildinginstruction.jpg")'
          },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1
        }}
      />

      {/* Scrollable content layer */}
      <Box sx={{ position: 'relative', marginTop: { xs: '0px', sm: '80px' }, py: 4 }}>
        {loading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999 // ensure it appears above other content
            }}
          >
            <img src='/images/loader.gif' alt='Loading...' style={{ width: 100, height: 100 }} />
          </Box>
        )}

        <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto', px: { xs: 2, md: 0 }, position: 'relative', zIndex: 5 }}>
          {error && !loading && <div>Error: {error}</div>}

          <Grid container rowSpacing={15} columnSpacing={10} justifyContent='center'>
            {instructions.map(item => (
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
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  {/* LEGO Header */}
                  <Box
                    sx={{
                      position: 'relative',
                      height: 60,
                      backgroundImage: `url(${item.acf?.lego_long?.url || ''})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      variant='h6'
                      sx={{
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '14px',
                        textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
                        whiteSpace: 'nowrap'
                      }}
                      dangerouslySetInnerHTML={{ __html: item.acf?.packages_name || item.name }}
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
                      padding: '14px'
                    }}
                  >
                    <img
                      src={item.acf?.package_logo?.url || 'https://via.placeholder.com/150'}
                      alt={item.acf?.packages_name || item.name}
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

BuildingInstruction.getLayout = page => <UserLayout pageTitle='Select Package'>{page}</UserLayout>

export default BuildingInstruction
