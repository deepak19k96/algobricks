// pages/forgotpassword.js
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { useDispatch, useSelector } from 'react-redux'
import { 
  sendForgotPasswordRequest, 
  clearForgotPasswordState 
} from 'src/store/forgotPasswordSlice'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { loading, message, error } = useSelector((state) => state.forgotPassword)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    dispatch(sendForgotPasswordRequest(data.email))
  }

  // Optionally clear state on unmount
  useEffect(() => {
    return () => {
      dispatch(clearForgotPasswordState())
    }
  }, [dispatch])

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: {
            xs: 'url(/images/ResetPasswordBackgroundMobile.jpg)', // Mobile background
            sm: 'url(/images/ResetPasswordBackground.jpg)'         // Default background for larger screens
          },        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pt: 30,
      }}
    >
      <Card
        sx={{
          width: { xs: '90%', sm: 500 },
          borderRadius: 2,
          padding: 8,
          boxShadow: 3,
          minHeight: 150,
          position: 'relative', // Add relative positioning for loader overlay
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Heading */}
          <Typography
            variant='h4'
            align='center'
            sx={{ fontWeight: 'semibold', mb: 4, color: '#054A91' }}
          >
            Reset Password
          </Typography>

          {/* Display server message */}
          {message && (
            <Typography
              variant='body2'
              align='center'
              sx={{ mb: 3, color: '#388e3c' }}
            >
              {message}
            </Typography>
          )}
          {error && (
            <Typography
              variant='body2'
              align='center'
              sx={{ mb: 3, color: '#d32f2f' }}
            >
              {error}
            </Typography>
          )}

          {/* Forgot Password Form */}
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label='Email'
              fullWidth
              variant='outlined'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Enter a valid email'
                }
              })}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
              sx={{
                mb: 4,
                '& label.Mui-focused': { color: '#054A91' },
                '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                  borderColor: '#054A91'
                }
              }}
            />

            <Button
              type='submit'
              variant='contained'
              fullWidth
              disabled={loading}
              sx={{
                mb: 4,
                backgroundColor: '#054A91',
                color: '#fff',
                fontWeight: 700,
                '&:hover': {
                  backgroundColor: '#003b6f'
                }
              }}
            >
              {loading ? 'Sending...' : 'Get New Password'}
            </Button>
          </form>

          {/* Login Page Link */}
          <Typography variant='body2' align='center'>
            <Link href='/pages/login' passHref>
              <Typography
                component='span'
                sx={{ color: '#054A91', cursor: 'pointer', fontWeight: 600 }}
              >
                Login Page
              </Typography>
            </Link>
          </Typography>
        </CardContent>

        {/* Loader Overlay */}
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          >
            <img src='/images/loader.gif' alt='Loading...' style={{ width: 100, height: 100 }} />
          </Box>
        )}
      </Card>
    </Box>
  )
}

ForgotPassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
