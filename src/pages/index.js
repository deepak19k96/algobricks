import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      // If the token doesn't exist, navigate to the login page
      router.push('/pages/login')
    } else {
      // If the token exists, navigate to the Building Instruction page
      router.push('/buildinginstruction') // Ensure your route matches your file name
    }
  }, [router])

  return <ApexChartWrapper></ApexChartWrapper>
}

export default Dashboard
