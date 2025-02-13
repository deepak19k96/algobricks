// ** React Imports
import React, { useState, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import { styled } from '@mui/material/styles'

// ** Icons
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Config
import themeConfig from 'src/configs/themeConfig'

// ** React Hook Form
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login } from 'src/store/authSlice'
import { setSnackbarMessage } from 'src/store/snackbarSlice'

// Example: slightly bigger label for the checkbox text
const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.95rem'
  }
}))

const LoginPage = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  // Form state
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

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

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(login(data)).unwrap(); // Assuming login returns the token and user data
      if (response?.token) {
        // Save token and user info in localStorage
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('user', JSON.stringify(response));
  
        // Navigate to home page
        router.push('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      await dispatch(setSnackbarMessage({ message: 'Login failed', type: 'error' }));
    }
  };
  

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage:
          'url("https://online.youngengineers.org/static/media/LoginBackground.e7741a88.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Card
          sx={{
            width: '32rem',
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <CardContent
            sx={{
              // Increase internal padding
              p: 15
            }}
          >
            {/* Top Logos */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
                gap: 10,
                flexWrap: 'wrap'
              }}
            >
              <Box>
                <img
                  src='https://online.youngengineers.org/static/media/young_engineers_logo.6c123553.png'
                  alt='Young Engineers Logo'
                  style={{ maxHeight: 60 }}
                />
              </Box>
              <Box>
                <img
                  src='https://online.youngengineers.org/static/media/online_logo.4543131d.png'
                  alt='Young Engineers Online Logo'
                  style={{ maxHeight: 60 }}
                />
              </Box>
            </Box>

            {/* Heading */}
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 4,
                color: '#054A91'
              }}
            >
              Log in
            </Typography>

            {/* Form */}
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              {/* Username or Email */}
              <TextField
  fullWidth
  label='Username'
  sx={{ mb: 4 }}
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
/>

{/* Password */}
<FormControl fullWidth sx={{ mb: 3 }} error={!!errors.password}>
  <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
  <OutlinedInput
    label='Password'
    id='auth-login-password'
    onChange={handleChange('password')}
    type={values.showPassword ? 'text' : 'password'}
    {...register('password', {
      required: true,
      minLength: 8
    })}
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
  <FormHelperText>
    {errors.password.type === 'required'
      ? 'Password is required'
      : 'Password must be at least 8 characters'}
  </FormHelperText>
)}
              </FormControl>

              {/* Terms + Forgot password on same line */}
              <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    mb: 3
  }}
>
<Link passHref href='/'>
    <Typography

      sx={{
        cursor: 'pointer',
        fontSize: '0.8rem',
        whiteSpace: 'nowrap',
        color: '#054A91',
        fontWeight: 700,

       
      }}
    >
      Forgot password?
    </Typography>
  </Link>
  {/* Smaller checkbox + smaller text */}
  <FormControlLabel
    control={<Checkbox size='small' />}
    label={
      <Typography sx={{ fontSize: '0.7rem', fontWeight:'900', whiteSpace: 'nowrap',  }}>
      By logging in i approve the <span style={{ color: '#054A91' }}>Term of use</span>
      </Typography>
    }
    sx={{ mr: 0 }} // small right margin, if needed
  />

  {/* Forgot password link with smaller font */}

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

              {/* Want to join? */}
              <Box sx={{ textAlign: 'center' }}>
  <Typography variant='body2' sx={{ mb: 1 }}>
    Want to join Young Engineers?
  </Typography>
  <Typography variant='body2'>
    <Link passHref href='/'>
      <Typography component='span' variant='body2' sx={{ cursor: 'pointer', mx: 1, fontWeight: 600 ,        fontSize: '0.8rem',
 }}>
        Student <span style={{ color: '#054A91' }}>Learn More</span>
      </Typography>
    </Link>
    |
    <Link passHref href='/'>
      <Typography component='span' variant='body2' sx={{ cursor: 'pointer', mx: 1,fontWeight: 600,fontSize: '0.8rem', }}>
        Teacher <span style={{ color: '#054A91' }}>Learn More</span>
      </Typography>
    </Link>
  </Typography>
</Box>

            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
