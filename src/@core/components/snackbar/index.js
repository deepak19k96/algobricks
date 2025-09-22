// src/@core/components/snackbar/index.js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { closeSnackbar, clearSnackbarMessage } from 'src/store/snackbarSlice'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const SnackbarAlert = () => {
  const { open, message, severity, autoHideDuration, key } = useSelector(state => state.snackbar)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(closeSnackbar())
  }

  const handleExited = () => {
    dispatch(clearSnackbarMessage()) // No payload needed!
  }

  return (
    <Snackbar
      key={key}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      onExited={handleExited}
    >
      <Alert onClose={handleClose} severity={severity || 'info'}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert
