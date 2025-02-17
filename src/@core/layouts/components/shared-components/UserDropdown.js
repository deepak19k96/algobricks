import React from 'react'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import { useTheme, useMediaQuery } from '@mui/material'

const LogoutButton = () => {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    // Navigate to the login page
    router.push('/pages/login')
  }

  if (isMobile) {
    // For mobile, only show the icon without border or extra styling
    return (
      <IconButton onClick={handleLogout} sx={{ color: 'white' }}>
        <LogoutVariant sx={{ fontSize: '2.1rem' }} />
      </IconButton>
    )
  }

  // Desktop view: full button with text and styling
  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      startIcon={<LogoutVariant sx={{ fontSize: '2.1rem' }} />}
      sx={{
        backgroundColor: 'red',
        color: '#fff',
        textTransform: 'none',
        borderRadius: '9999px',
        fontSize: '1rem',
        fontWeight: '700',
        px: 10,
        py: 5,
        '&:hover': {
          backgroundColor: '#8B0000'
        }
      }}
    >
      Log out
    </Button>
  )
}

export default LogoutButton
