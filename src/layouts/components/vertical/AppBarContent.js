// AppBarContent.js (or VerticalAppBarContent.js)
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
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: isMobile ? 'auto' : '120px',
        zIndex: 1100,
        backgroundImage:
          'url("https://online.youngengineers.org/static/media/Header_admin.9c76f9b7.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: isMobile ? 'space-around' : 'space-between',
        p: isMobile ? 1 : 0
      }}
    >
      {isMobile ? (
        <>
          {/* Mobile Top Row: Greeting and UserDropdown */}
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
                px: 3,
                py: 2,
                borderRadius: '0 20px 20px 0'
              }}
            >
              <Typography
                sx={{
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '1rem'
                }}
              >
                Hi {userName}
              </Typography>
            </Box>
            {/* Mobile: Show UserDropdown */}
            <Box sx={{ pr: 2 }}>
              <UserDropdown />
            </Box>
          </Box>
          {/* Mobile Bottom Row: Icons and Page Title */}
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              my: 1
            }}
          >
            {showIcons && (
              <Box sx={{ mb: 1 }}>
                <IconButton
                  onClick={() => router.push('/')}
                  sx={{ color: '#fff', mr: 2 }}
                >
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
                <IconButton onClick={() => router.back()} sx={{ color: '#fff' }}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1.5rem"
                    width="1.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448
                      0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72
                      -20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3
                      0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z" />
                  </svg>
                </IconButton>
              </Box>
            )}
            <Typography
              sx={{
                color: '#fff',
                fontWeight: 550,
                fontSize: '20px',
                fontFamily: 'sans-serif'
              }}
            >
              {pageTitle}
            </Typography>
          </Box>
        </>
      ) : (
        // Desktop Layout
        <>
          {/* Left: Greeting Bubble */}
          <Box
            sx={{
              // Removed fixed width
              backgroundColor: '#91B508',
              color: '#fff',
              fontWeight: 500,
              fontSize: '2rem',
              borderRadius: '0 40px 40px 0',
              px: 3,
              // Use minHeight instead of a fixed height so the box can grow vertically if needed
              minHeight: '75px',
              display: 'flex',
              alignItems: 'center',
              // Keep text on one line
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
                  onClick={() => router.push('/')}
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
                    <path d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448
                      0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72
                      -20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3
                      0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z" />
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
  )
}

export default AppBarContent
