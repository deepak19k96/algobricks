// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import BookOpenOutline from 'mdi-material-ui/BookOpenOutline'

// ------------------------------------------------
// Reusable styles
// ------------------------------------------------

// Standard menu item row
const menuItemBoxStyle = {
  py: 1.5,
  px: 3,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  color: '#444',
  fontSize: '1.125rem',
  textDecoration: 'none',
  '& svg': {
    fontSize: '1.375rem',
    color: '#1976d2'
  }
}

// Pill‐shaped button for "Log out"
const logoutButtonStyle = {
  border: '1px solid #ccc',
  borderRadius: '9999px',
  backgroundColor: '#fff',
  color: '#000',
  px: 3,
  py: 0.75,
  fontSize: '1.125rem',
  cursor: 'pointer',
  textAlign: 'center'
}

const UserDropdown = () => {
  // ** State
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Next Router
  const router = useRouter()

  // ** Handlers
  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }
  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    // Navigate to the login page
    router.push('/pages/login')
  }
  return (
    <Fragment>
      {/* The gear icon that opens the menu */}
      <Box onClick={handleDropdownOpen} sx={{ ml: 2, cursor: 'pointer' }}>
        {/* Responsive CogOutline icon: smaller on mobile, larger on desktop */}
        <CogOutline sx={{ fontSize: { xs: '3rem', sm: '4rem' }, color: 'white' }} />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{
          '& .MuiMenu-paper': {
            width: { xs: 220, sm: 250 }, // responsive width adjustment
            boxShadow: 3,
            borderRadius: 1
          }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* Building Instructions */}
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/buildinginstruction')}>
          <Box sx={menuItemBoxStyle}>
            <BookOpenOutline />
            Building Instructions
          </Box>
        </MenuItem>

        {/* Log out (as a pill‐shaped button) */}
        <MenuItem sx={{ display: 'flex', justifyContent: 'center', p: 2 }} onClick={handleLogout}>
          <Box sx={logoutButtonStyle}>Log out</Box>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        {/* Terms of use (center aligned, no icon) */}
        <MenuItem
          sx={{ p: 0, display: 'flex', justifyContent: 'center' }}
          onClick={() => handleDropdownClose('/buildinginstruction')}
        >
          <Box sx={{ ...menuItemBoxStyle, gap: 0, justifyContent: 'center' }}>Terms of use</Box>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
