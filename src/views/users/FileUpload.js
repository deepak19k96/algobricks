import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile, resetUpload } from 'src/store/uploadSlice'
import { setSnackbarMessage } from 'src/store/snackbarSlice'
import { Button, LinearProgress, Typography, Box } from '@mui/material'

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const dispatch = useDispatch()
  const { status, error } = useSelector(state => state.upload)

  useEffect(() => {
    if (error !== null) dispatch(setSnackbarMessage({ message: error, severity: 'error' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (status === 'succeeded')
      dispatch(setSnackbarMessage({ message: 'User credentials uploaded successfully', severity: 'success' }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, status])

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = () => {
    dispatch(resetUpload())
    if (selectedFile) {
      dispatch(uploadFile(selectedFile))
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    dispatch(resetUpload())
  }

  return (
    <Box>
      <input type='file' onChange={handleFileChange} style={{ display: 'none' }} id='file-input' />
      <label htmlFor='file-input'>
        <Button variant='contained' component='span'>
          Select Csv File
        </Button>
      </label>
      {selectedFile && (
        <Box mt={2}>
          <Typography variant='body1'>Selected File: {selectedFile.name}</Typography>
        </Box>
      )}
      {status === 'loading' && <LinearProgress />}

      <Box mt={2} display='flex' justifyContent='space-between'>
        <Button
          variant='contained'
          color='primary'
          onClick={handleUpload}
          disabled={!selectedFile || status === 'loading'}
        >
          Upload
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleReset} disabled={status === 'loading'}>
          Reset
        </Button>
      </Box>
    </Box>
  )
}

export default FileUpload
