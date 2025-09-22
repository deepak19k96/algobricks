import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
   Fade,
  CircularProgress
} from '@mui/material'
import { styled } from '@mui/material/styles'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import { getAlgobrixBackersByEmail } from 'src/store/authSlice'
import { fetchUserData } from 'src/store/userDataSlice'
import { sendOtp, verifyOtp, resetOtpState } from 'src/store/authSlice'

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.95rem'
  }
}))

const LoginPage = () => {
const { user, isLoading, sendingOtp, verifyingOtp, otpSent } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const [termsChecked, setTermsChecked] = useState(false)
  const [termsError, setTermsError] = useState(false)
const [otp, setOtp] = useState(['', '', '', '']) // 4 separate boxes
const [otpError, setOtpError] = useState('')
const [resendTimer, setResendTimer] = useState(0)

const [email, setEmail] = useState('')

const {
  register,
  handleSubmit,
  getValues,  // Add this line
  formState: { errors }
} = useForm()

  useEffect(() => {
    if (
      localStorage?.getItem('accessToken') !== '' &&
      localStorage?.getItem('accessToken') !== null &&
      user?.Email !== null &&
      user?.Email !== undefined
    ) {
      router.push('/')
    }
  }, [user, router])

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const onSubmit = async data => {
  // First step: Send OTP
  if (!otpSent) {
    if (!termsChecked) {
      setTermsError(true)
      return
    }
    
    await handleSendOtp()
  } 
  // Second step: Verify OTP
  else {
    await handleVerifyOtp()
  }
}
// Resend timer countdown
useEffect(() => {
  let interval = null
  if (resendTimer > 0) {
    interval = setInterval(() => {
      setResendTimer(resendTimer - 1)
    }, 1000)
  } else if (resendTimer === 0) {
    clearInterval(interval)
  }
  return () => clearInterval(interval)
}, [resendTimer])

// Handle Send OTP
const handleSendOtp = async () => {
  const emailValue = getValues('email')
  
  if (!emailValue || errors.email) {
    return
  }

  if (!termsChecked) {
    setTermsError(true)
    return
  }

  try {
    const result = await dispatch(sendOtp({ email: emailValue })).unwrap()
    setEmail(emailValue)
    setResendTimer(60)
    setOtpError('')
  } catch (error) {
    setOtpError(error || 'Failed to send OTP. Please try again.')
  }
}





// Handle OTP input change for 4-box design
const handleOtpChange = (index, value) => {
  if (value.length > 1) return // Prevent multiple characters
  
  const newOtp = [...otp]
  newOtp[index] = value
  setOtp(newOtp)
  
  // Auto-focus next input
  if (value !== '' && index < 3) {
    document.getElementById(`otp-${index + 1}`).focus()
  }
  
  if (otpError) setOtpError('')
}

// Handle OTP key events (backspace to go back)
const handleOtpKeyDown = (index, e) => {
  if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
    document.getElementById(`otp-${index - 1}`).focus()
  }
}

// Handle Verify OTP
const handleVerifyOtp = async () => {
  const otpString = otp.join('')
  
  if (otpString.length !== 4) {
    setOtpError('Please enter all 4 digits')
    return
  }

  try {
    const result = await dispatch(verifyOtp({ 
      email, 
      otp: otpString 
    })).unwrap()
    
    if (result.token) {
      const algobrixBackersUser = result.user
      const token = result.token
      localStorage.setItem('accessToken', token)
      localStorage.setItem('user', JSON.stringify(algobrixBackersUser))

      if (algobrixBackersUser?.Status === 'Blocked') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        router.push('/blockeduser')
      } else {
        router.push('/buildinginstruction')
      }
    }
  } catch (error) {
    setOtpError(error || 'Invalid OTP. Please check and try again.')
  }
}

const handleResendOtp = async () => {
  try {
    await dispatch(sendOtp({ email })).unwrap()
    setResendTimer(60)
    setOtpError('')
  } catch (error) {
    setOtpError(error || 'Failed to resend OTP. Please try again.')
  }
}

// Reset to email step
const handleBackToEmail = () => {
  dispatch(resetOtpState()) // Reset Redux state
  setOtp(['', '', '', ''])
  setOtpError('')
  setResendTimer(0)
  setEmail('')
}

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url(/images/mainbg.jpg)',

        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* The main login content */}
      <Box
        sx={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: { xs: 2, sm: 0 }
        }}
      >
        <Card
          sx={{
            width: { xs: '90%', sm: '32rem' },
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 15 } }}>
            {/* Top Logos */}
            {/* Top Logos */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                mb: { xs: 2, sm: 2 },
                gap: { xs: 6, sm: 10 },
                flexWrap: 'nowrap'
              }}
            >
              <Box
                component='img'
                src='/images/logomain-1.png'
                alt='Young Engineers Logo'
                sx={{
                  width: { xs: 80, sm: 'auto' },
                  height: { xs: 40, sm: 60 },
                  objectFit: 'contain'
                }}
              />
              <Box
                component='img'
                src='/images/logomain-2.png'
                alt='Young Engineers Online Logo'
                sx={{
                  width: { xs: 100, sm: 'auto' },
                  height: { xs: 60, sm: 60 },
                  objectFit: 'contain'
                }}
              />
            </Box>

            {/* Heading */}
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 1,
                color: '#054A91'
              }}
            >
              {otpSent ? 'Verify OTP' : 'Log in'}

            </Typography>
{otpSent && !otpError && (
  <Typography 
    variant='body2' 
    sx={{ 
      textAlign: 'center', 
      color: '#4CAF50', 
      mb: 2,
      fontWeight: 500
    }}
  >
    OTP sent to {email}
  </Typography>
)}

{/* OTP Error */}
{otpError && (
  <Typography variant='body2' sx={{ textAlign: 'center', color: 'red', mb: 2 }}>
    {otpError}
  </Typography>
)}
            {/* Warning for Terms not accepted */}
            {termsError && (
              <Typography variant='body2' sx={{ textAlign: 'center', color: 'red', mb: 2 }}>
                You must agree to the terms of use
              </Typography>
            )}

            {/* Form */}
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              {/* Username or Email */}
<TextField
  fullWidth
  label='Email'
  {...register('email', {
    required: 'Email is required',
    minLength: {
      value: 3,
      message: 'Email must be at least 3 characters'
    },
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    }
  })}
  error={!!errors.email}
  helperText={errors.email?.message || ''}
  disabled={otpSent}  // Add this line
  sx={{
    mb: otpSent ? 2 : 4,  // Change this line
    '& label.Mui-focused': {
      color: '#054A91'
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: '#054A91'
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {  // Add this
      backgroundColor: '#f5f5f5'
    }
  }}
/>

{/* 4-Box OTP Input - appears after email verification */}
<Fade in={otpSent} timeout={500}>
  <Box sx={{ mb: otpSent ? 3 : 0 }}>
    {otpSent && (
      <Box>
        <Typography 
          variant='body2' 
          sx={{ 
            textAlign: 'center', 
            mb: 2, 
            fontWeight: 600,
            color: '#054A91'
          }}
        >
          Enter 4-digit OTP
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2, 
            mb: 2 
          }}
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              inputProps={{
                inputMode: 'numeric',
                pattern: '\\d{1}',
                maxLength: 1,
                style: { 
                  textAlign: 'center', 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold' 
                }
              }}
              sx={{
                width: 60,
                height: 60,
                '& .MuiOutlinedInput-root': {
                  height: 60,
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: otpError ? 'red' : '#ddd',
                    borderWidth: 2
                  },
                  '&:hover fieldset': {
                    borderColor: otpError ? 'red' : '#054A91'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: otpError ? 'red' : '#054A91',
                    borderWidth: 2
                  }
                }
              }}
            />
          ))}
        </Box>
      </Box>
    )}
  </Box>
</Fade>



              {/* Password 
              <FormControl
                fullWidth
                error={!!errors.password}
                sx={{
                  mb: 3,
                  '& label.Mui-focused': {
                    color: '#054A91'
                  },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#054A91'
                  }
                }}
              >
                <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <FormHelperText>Password is required</FormHelperText>
                )}
              </FormControl>
            */}
              {/*Forgot Password and Terms Row  */}
{/* Terms and Resend Section */}
<Box
  sx={{
    display: { xs: 'block', sm: 'flex' },
    alignItems: { xs: 'flex-start', sm: 'center' },
    justifyContent: 'space-between',
    mb: 3
  }}
>
  {/* Terms Checkbox - only show if OTP not sent */}
  {!otpSent && (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            size='small'
            checked={termsChecked}
            onChange={e => {
              setTermsChecked(e.target.checked)
              if (e.target.checked) setTermsError(false)
            }}
            sx={{
              '&.Mui-checked': { color: '#054A91' }
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 900,
              whiteSpace: 'nowrap'
            }}
          >
            By logging in I approve the{' '}
            <Link passHref href='/pages/termsofuse'>
              <Typography
                component='span'
                sx={{
                  color: '#054A91',
                  fontSize: '0.7rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontWeight: 1000
                }}
              >
                Terms of use
              </Typography>
            </Link>
          </Typography>
        }
        sx={{ mr: 0 }}
      />
    </Box>
  )}

  {/* Resend OTP Section - only show if OTP sent */}
  {otpSent && (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', width: '100%' }}>
      <Button
        variant='text'
onClick={handleResendOtp}
        disabled={resendTimer > 0 || sendingOtp}
        sx={{
          color: '#054A91',
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'none'
        }}
      >
        {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
      </Button>
      
      <Button
        variant='text'
        onClick={handleBackToEmail}
        sx={{
          color: '#666',
          fontSize: '0.8rem',
          fontWeight: 600,
          textTransform: 'none'
        }}
      >
        Change Email
      </Button>
    </Box>
  )}
</Box>


              {/* Login Button */}
              <Button
                fullWidth
                size='large'
                type='submit'
                variant='contained'
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
                {sendingOtp ? (
  <>
    <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
    SENDING OTP...
  </>
) : verifyingOtp ? (
  <>
    <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
    VERIFYING...
  </>
) : otpSent ? (
  'VERIFY OTP'
) : (
  'SEND OTP'
)}

              </Button>

              {/* "Want to join?" Section */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  Want to join Young Engineers?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='https://youngengineers.org/'>
                    <Typography
                      component='span'
                      variant='body2'
                      sx={{
                        cursor: 'pointer',
                        mx: 1,
                        fontWeight: 600,
                        fontSize: '0.8rem'
                      }}
                    >
                      Student <span style={{ color: '#054A91' }}>Learn More</span>
                    </Typography>
                  </Link>
                  |
                  <Link passHref href='https://youngengineers.org/'>
                    <Typography
                      component='span'
                      variant='body2'
                      sx={{
                        cursor: 'pointer',
                        mx: 1,
                        fontWeight: 600,
                        fontSize: '0.8rem'
                      }}
                    >
                      Teacher <span style={{ color: '#054A91' }}>Learn More</span>
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>

      {/* Loader Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <img src='/images/loader.gif' alt='Loading...' style={{ width: 100, height: 100 }} />
        </Box>
      )}
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
