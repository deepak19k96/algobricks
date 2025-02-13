// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
<Box
  sx={{
    width: '100vw',
    height: '100px',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1100,
    backgroundImage: 'url("https://online.youngengineers.org/static/media/Header_admin.9c76f9b7.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
  }}
>
  {/* Left Content with User Display Name */}
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box
      sx={{
        backgroundColor: '#8BC34A', // Green background color
        color: '#fff',
        fontWeight: 800,
        borderRadius: '20px',
        padding: '8px 16px',
        display: 'inline-block',
      }}
    >
      Hi {typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'))?.user_display_name}
    </Box>
  </Box>

  {/* Right Content (User Dropdown) */}
  <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
    <UserDropdown />
  </Box>
</Box>


  
  )
}

export default AppBarContent
