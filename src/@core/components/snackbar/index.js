// App.js or _app.js (if using Next.js)
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { clearSnackbarMessage } from 'src/store/snackbarSlice'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const SnackbarAlert = () => {
  const { message, severity } = useSelector(state => state.snackbar)

  const dispatch = useDispatch()

  const handleCloseSnackbar = async () => {
    // Handle form submission here
    try {
      // Call API to authenticate user
      // For simplicity, assuming loginUser is a Redux action
      await dispatch(clearSnackbarMessage({ message: null, severity: 'error' }))
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <div>
      {/* Your app content */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={!!message}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SnackbarAlert
