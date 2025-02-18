import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'
import { useRouter } from 'next/router'
import { fetchInstructions } from 'src/store/instructionsSlice'

// 1) Make sure you import your UserLayout
import UserLayout from 'src/layouts/UserLayout'

const BuildingInstruction = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { items: instructions, loading, error } = useSelector(state => state.instructions)

  useEffect(() => {
    dispatch(fetchInstructions())
  }, [dispatch])

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100%',
        backgroundImage: 'url("/images/buildinginstruction.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        marginTop: { xs: '30px', sm: '50px' },
        py: 4
      }}
    >
      {/* Loader Overlay */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10, // make sure the loader is above the background and content
            backgroundColor: 'rgba(255, 255, 255, 0.5)' // optional: add a semi-transparent background
          }}
        >
          <img
            src='/images/loader.gif'
            alt='Loading...'
            style={{ width: 100, height: 100 }}
          />
        </Box>
      )}

      {/* Content Container */}
      <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto', px: { xs: 2, md: 0 }, position: 'relative', zIndex: 5 }}>
        {/* Show error if exists and not loading */}
        {error && !loading && <div>Error: {error}</div>}

        <Grid container rowSpacing={15} columnSpacing={15} justifyContent='center'>
          {instructions.map(item => (
            <Grid item key={item.id}>
              <Card
                onClick={() => router.push(`/model/${item.id}`)}
                sx={{
                  width: 350,
                  height: 250,
                  boxShadow: '0px 100px 100px rgba(0, 0, 0, 0.1)',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    cursor: 'pointer',
                    transform: 'translateY(-5px)'
                  }
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
                    borderTopRightRadius: 8
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
                      textShadow: '0 0 5px rgba(0, 0, 0, 0.8)'
                    }}
                    dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                  />
                </Box>

                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 180,
                    backgroundColor: '#F5F5F5',
                    padding: '10px'
                  }}
                >
                  <img
                    src={
                      item.package_logo
                        ? item.package_logo[0]
                        : 'https://via.placeholder.com/150'
                    }
                    alt={item.title.rendered}
                    style={{ maxWidth: '100%', maxHeight: '160px' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

// 2) Wrap your page with UserLayout and pass the pageTitle
BuildingInstruction.getLayout = page => {
  return (
    <UserLayout pageTitle='Select Package'>
      {page}
    </UserLayout>
  )
}

export default BuildingInstruction
