import React, { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import ProcessorOrderTable from 'src/views/pages/ProcessorOrderTable'
import ProcessorOrderList from 'src/views/pages/ProcessorOrderList'
import { Typography } from '@mui/material'

import { useSelector, useDispatch } from 'react-redux'
import { fetchTickets } from 'src/store/ticketsSlice'

const Orders = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTickets())
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Typography component={'h2'} fontSize={'1.5rem'}>
            Orders
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ProcessorOrderTable />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Orders
