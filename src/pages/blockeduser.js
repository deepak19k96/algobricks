import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'

const BlockedUser = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        background: 'url(/images/whitebg.jpeg) no-repeat center center fixed',
        backgroundSize: 'cover',
        m: 0,
        p: 0,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '600px',
          p: { xs: '1.5rem', sm: '2rem' },
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #D32F2F',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: '#000',
            fontSize: { xs: '1.5rem', sm: '1.75rem' }
          }}
        >
          We regret to inform you that your access to our website has been blocked.
        </Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: '#000',
            fontSize: { xs: '1.3rem', sm: '1.5rem' }
          }}
        >
          If you need any assistance or believe this is an error, please contact our support team at{' '}
          <Box
            component="span"
            sx={{
              textDecoration: 'underline',
              color: '#000'
            }}
          >
            support@youngengineers.org
          </Box>
          .
        </Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: { xs: '1.3rem', sm: '1.5rem' }
          }}
        >
          We’re here to help and will be happy to assist you.
        </Typography>
      </Box>
    </Box>
  )
}

export default BlockedUser
