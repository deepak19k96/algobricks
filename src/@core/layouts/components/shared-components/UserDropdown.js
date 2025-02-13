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
import NoteTextOutline from 'mdi-material-ui/NoteTextOutline'       // Franchise Owners
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline' // All Students List
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'   // Sign Up New Franchise
import BookOpenOutline from 'mdi-material-ui/BookOpenOutline'         // Building Instructions
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline' // Lesson Plans
// We won't use the LogoutVariant icon since "Log out" is a pill button.

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
  // Darker text color to match your screenshot
  color: '#444',
  fontSize: '1.125rem', // ~18px
  textDecoration: 'none',
  '& svg': {
    // Icon size from screenshot (~22px), color can be your desired blue
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

  return (
    <Fragment>
      {/* The gear icon that opens the menu (style as you like) */}
      <Box onClick={handleDropdownOpen} sx={{ ml: 2, cursor: 'pointer' }}>
        <CogOutline sx={{ fontSize: '4rem', color: 'white' }} />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{
          '& .MuiMenu-paper': {
            // slightly wider to match your screenshot
            width: 250,
            // Increase top margin so the menu sits lower
            boxShadow: 3,
            borderRadius: 1
          }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* 1. Franchise Owners */}
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/franchise-owners')}>
          <Box sx={menuItemBoxStyle}>
            <NoteTextOutline />
            Franchise Owners
          </Box>
        </MenuItem>

        {/* 2. All Students List */}
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/all-students-list')}>
          <Box sx={menuItemBoxStyle}>
            <AccountGroupOutline />
            All Students List
          </Box>
        </MenuItem>

        {/* 3. Sign Up New Franchise */}
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/sign-up-franchise')}>
          <Box sx={menuItemBoxStyle}>
            <AccountPlusOutline />
            Sign Up New Franchise
          </Box>
        </MenuItem>

        {/* 4. Building Instructions */}
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/buildinginstruction')}>
          <Box sx={menuItemBoxStyle}>
            <BookOpenOutline />
            Building Instructions
          </Box>
        </MenuItem>

        {/* 5. Lesson Plans */}
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/lesson-plans')}>
          <Box sx={menuItemBoxStyle}>
            <FileDocumentOutline />
            Lesson Plans
          </Box>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        {/* 6. Log out (as a pill‐shaped button) */}
        <MenuItem
          sx={{ display: 'flex', justifyContent: 'center', p: 2 }}
          onClick={() => handleDropdownClose('/logout')}
        >
          <Box sx={logoutButtonStyle}>Log out</Box>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        {/* 7. Terms of use (center aligned, no icon) */}
        <MenuItem
          sx={{ p: 0, display: 'flex', justifyContent: 'center' }}
          onClick={() => handleDropdownClose('/terms-of-use')}
        >
          <Box sx={{ ...menuItemBoxStyle, gap: 0, justifyContent: 'center' }}>Terms of use</Box>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
