// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Typography, Box } from '@mui/material'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** File Upload Components Imports
import FileUpload from 'src/views/users/FileUpload'

const ImportUsers = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              width: '100%',
              maxWidth: '50%',
              mx: 'auto',
              mt: 5,
              border: '3px solid #9952fb',
              borderRadius: '11px',
              padding: '24px',
              textAlign: 'center'
            }}
          >
            <Typography variant='h4' align='center' gutterBottom>
              Upload users credentials
            </Typography>
            <FileUpload />
          </Box>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default ImportUsers
