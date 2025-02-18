// AppBarContent.js
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const AppBarContent = ({ pageTitle, showIcons }) => {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Safely get the user name (this code runs only on the client)
  const userName =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))?.user_display_name
      : ''

  return (
    <>
      {/* The main bar (fixed) */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          // Make height smaller since icons/title have moved out
          height: isMobile ? '100px' : '120px',
          zIndex: 1100,
          backgroundImage: isMobile? 'url("/images/navbarmobile.jpeg")':
            'url("https://online.youngengineers.org/static/media/Header_admin.9c76f9b7.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-around' : 'space-between',
          p: isMobile ? 0 : 0
        }}
      >
        {isMobile ? (
          // --- MOBILE TOP BAR ONLY: "Hi User" and user dropdown ---
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 0,
              py: 0
            }}
          >
            <Box
              sx={{
                backgroundColor: '#91B508',
                py: 5,
                borderRadius: '0 40px 40px 0',
                px: 5,
                             display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              <Typography
                sx={{
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '1.1rem'
                }}
              >
                Hi {userName}
              </Typography>
            </Box>
            {/* User dropdown on the right */}
            <Box sx={{ pr: 2 }}>
              <UserDropdown />
            </Box>
          </Box>
        ) : (
          // --- DESKTOP LAYOUT (unchanged) ---
          <>
            {/* Left: Greeting Bubble */}
            <Box
              sx={{
                backgroundColor: '#91B508',
                color: '#fff',
                fontWeight: 500,
                fontSize: '1.3rem',
                borderRadius: '0 40px 40px 0',
                px: 3,
                minHeight: '70px',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap'
              }}
            >
              Hi {userName}
            </Box>
            {/* Center: Icons and Page Title */}
            <Box sx={{ textAlign: 'center' }}>
              {showIcons && (
                <Box sx={{ mb: 1 }}>
                  <IconButton
                    onClick={() => router.push('/buildinginstruction')}
                    sx={{ color: '#fff', mr: 2 }}
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="2rem"
                      width="2em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </IconButton>
                  <IconButton onClick={() => router.back()} sx={{ color: '#fff' }}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="2rem"
                      width="2em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 256c0 137 111 248 248 248s248-111 
                          248-248S393 8 256 8 8 119 8 256zm448 
                          0c0 110.5-89.5 200-200 200S56 366.5 
                          56 256 145.5 56 256 56s200 89.5 200 
                          200zm-72-20v40c0 6.6-5.4 12-12 
                          12H256v67c0 10.7-12.9 16-20.5 
                          8.5l-99-99c-4.7-4.7-4.7-12.3 
                          0-17l99-99c7.6-7.6 20.5-2.2 
                          20.5 8.5v67h116c6.6 0 12 5.4 12 12z"
                      />
                    </svg>
                  </IconButton>
                </Box>
              )}
              <Typography
                sx={{
                  color: '#fff',
                  fontWeight: 550,
                  fontSize: '24px',
                  fontFamily: 'sans-serif'
                }}
              >
                {pageTitle}
              </Typography>
            </Box>
            {/* Right: User Dropdown */}
            <Box sx={{ mr: 15 }}>
              <UserDropdown />
            </Box>
          </>
        )}
      </Box>

      {/* 
        BELOW the fixed bar, render icons + title ONLY on mobile. 
        This Box is not fixed, so it appears “under” the main bar.
      */}
   {isMobile && (
  <>
    {/* Fixed icons/title bar under main navbar */}
    <Box
      sx={{
        position: 'fixed',
        top: '100px',       // the mobile navbar is 100px tall
        left: 0,
        width: '100%',
        zIndex: 1050,       // below the navbar’s 1100 but above content
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // optional shadow
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 1
      }}
    >
      {/* Icons row */}
      {showIcons && (
        <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
          {/* Home Icon */}
          <IconButton onClick={() => router.push('/')} sx={{ color: '#054A91', mr: 2 }}>
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="1.5rem"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          </IconButton>
          {/* Back Icon */}
          <IconButton onClick={() => router.back()} sx={{ color: '#054A91' }}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1.5rem"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 256c0 137 111 248 248 248s248-111 
                 248-248S393 8 256 8 8 119 8 256zm448 
                 0c0 110.5-89.5 200-200 200S56 366.5 
                 56 256 145.5 56 256 56s200 89.5 200 
                 200zm-72-20v40c0 6.6-5.4 12-12 
                 12H256v67c0 10.7-12.9 16-20.5 
                 8.5l-99-99c-4.7-4.7-4.7-12.3 
                 0-17l99-99c7.6-7.6 20.5-2.2 
                 20.5 8.5v67h116c6.6 0 12 5.4 12 12z"
            />
          </svg>
          </IconButton>
        </Box>
      )}

      {/* Page Title */}
      <Typography
        sx={{
          color: '#054A91',
          fontWeight: 550,
          fontSize: '20px',
          fontFamily: 'sans-serif'
        }}
      >
        {pageTitle}
      </Typography>
    </Box>

    {/* Push main content below these fixed bars */}
    <Box sx={{ mt: '160px' }} />
  </>
)}

    </>
  )
}

export default AppBarContent
