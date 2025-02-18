import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import { useRouter } from 'next/router'
import { fetchInstructions } from 'src/store/instructionsSlice'
import UserLayout from 'src/layouts/UserLayout'

const BuildingInstruction = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { items: instructions, loading, error } = useSelector((state) => state.instructions)

  useEffect(() => {
    dispatch(fetchInstructions())
  }, [dispatch])

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
          zIndex: -1,
        }}
      />

      {/* Scrollable content layer */}
      <Box
        sx={{
          position: 'relative',
          marginTop: { xs: '0px', sm: '50px' },
          py: 4,
        }}
      >
        {/* Loader Overlay */}
        {loading && (
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
        )}

        {/* Content Container */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 1000,
            mx: 'auto',
            px: { xs: 2, md: 0 },
            position: 'relative',
            zIndex: 5,
          }}
        >
          {error && !loading && <div>Error: {error}</div>}

          <Grid container rowSpacing={15} columnSpacing={15} justifyContent='center'>
            {instructions.map((item) => (
              <Grid
                item
                key={item.id}
                sx={{
                  // Center the card in mobile view
                  mx: { xs: 'auto', sm: 0 },
                }}
              >
                <Card
                  onClick={() => router.push(`/model/${item.id}`)}
                  sx={{
                    // Responsive dimensions for the card
                    width: { xs: 340, sm: 350 },
                    height: { xs: 260, sm: 250 },
                    boxShadow: '0 25px 10px 0 rgba(0, 0, 0, 0.2), 0 20px 30px 0 rgba(0, 0, 0, 0.19)',
                    borderRadius: 0,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      cursor: 'pointer',
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: 70,
                      backgroundImage: `url(${item.lego_long || ''})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    <Typography
                      variant='h6'
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '16px',
                        textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
                      }}
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: { xs: 200, sm: 180 },
                      backgroundColor: '#F5F5F5',
                      padding: '10px',
                    }}
                  >
                    <img
                      src={
                        item.package_logo
                          ? item.package_logo[0]
                          : 'https://via.placeholder.com/150'
                      }
                      alt={item.title.rendered}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
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

// Wrap the page with UserLayout and pass the pageTitle
BuildingInstruction.getLayout = (page) => {
  return (
    <UserLayout pageTitle='Select Package'>
      {page}
    </UserLayout>
  )
}

export default BuildingInstruction
