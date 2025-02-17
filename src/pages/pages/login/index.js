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
  FormHelperText
} from '@mui/material'
import { styled } from '@mui/material/styles'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import { login } from 'src/store/authSlice'

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.95rem'
  }
}))

const LoginPage = () => {
  const { user, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  const [termsChecked, setTermsChecked] = useState(false)
  const [termsError, setTermsError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (
      localStorage?.getItem('accessToken') !== '' &&
      user?.email !== null &&
      user?.email !== undefined
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
    if (!termsChecked) {
      setTermsError(true)
      
      return

    }

    try {
      const response = await dispatch(login(data)).unwrap()
      if (response?.token) {
        localStorage.setItem('accessToken', response.token)
        localStorage.setItem('user', JSON.stringify(response))
        router.push('/buildinginstruction')
      }
    } catch (error) {
      console.error('Login error:', error)
    }
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
    component="img"
    src="/images/logomain-1.png"
    alt="Young Engineers Logo"
    sx={{
      width: { xs: 80, sm: 'auto' },
      height: { xs: 40, sm: 60 },
      objectFit: 'contain'
    }}
  />
  <Box
    component="img"
    src="/images/logomain-2.png"
    alt="Young Engineers Online Logo"
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
              Log in
            </Typography>

            {/* Warning for Terms not accepted */}
            {termsError && (
              <Typography
                variant='body2'
                sx={{ textAlign: 'center', color: 'red', mb: 2 }}
              >
                You must agree to the terms of use
              </Typography>
            )}

            {/* Form */}
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              {/* Username or Email */}
              <TextField
                fullWidth
                label='Username'
                {...register('username', {
                  required: true,
                  minLength: 3
                })}
                error={!!errors.username}
                helperText={
                  errors.username
                    ? errors.username.type === 'required'
                      ? 'Username is required'
                      : 'Username must be at least 3 characters'
                    : ''
                }
                sx={{
                  mb: 4,
                  '& label.Mui-focused': {
                    color: '#054A91'
                  },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#054A91'
                  }
                }}
              />

              {/* Password */}
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

              {/* Forgot Password and Terms Row */}
              <Box
                sx={{
                  display: { xs: 'block', sm: 'flex' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <Box sx={{ mb: { xs: 1, sm: 0 } }}>
                  <Link passHref href='/'>
                    <Typography
                      sx={{
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap',
                        color: '#054A91',
                        fontWeight: 700
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Link>
                </Box>
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
                        <span style={{ color: '#054A91' }}>Term of use</span>
                      </Typography>
                    }
                    sx={{ mr: 0 }}
                  />
                </Box>
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
                LOGIN
              </Button>

              {/* "Want to join?" Section */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  Want to join Young Engineers?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/'>
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
                  <Link passHref href='/'>
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
          <img
            src='/images/loader.gif'
            alt='Loading...'
            style={{ width: 100, height: 100 }}
          />
        </Box>
      )}
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
