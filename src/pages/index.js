import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      router.push('/pages/login')
    }
  }, [router])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {/* Your Dashboard content */}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
