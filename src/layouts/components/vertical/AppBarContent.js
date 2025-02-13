import Box from '@mui/material/Box'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'

const AppBarContent = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '120px',
        zIndex: 1100,
        // Keep the background image if desired
        backgroundImage:
          'url("https://online.youngengineers.org/static/media/Header_admin.9c76f9b7.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Green bubble flush left */}
      <Box
        sx={{
          height: '75px',
          backgroundColor: '#91B508',
          width: '170px',
          color: '#fff',
          fontWeight: 500,
          fontSize: '2rem',
          // Rounded on right side only
          borderRadius: '0 40px 40px 0',
          // Horizontal padding so text doesn't touch edges
          px: 3,
          // Center text vertically
          display: 'flex',
          alignItems: 'center',
          // No margin on the left so it’s flush
          ml: 0
        }}
      >
        Hi{' '}
        {typeof window !== 'undefined' &&
          JSON.parse(localStorage.getItem('user'))?.user_display_name}
      </Box>

      {/* Right side: User Dropdown */}
      <Box sx={{ mr: 15 }}>
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
