/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsersAsync, fetchUsersWithIdAsync } from 'src/store/usersSlice'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import UsersTable from 'src/views/users/UsersTable'
import { Typography } from '@mui/material'

const Users = () => {
  // Use useSelector to access the user's role from the auth slice
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      if (user?.role === 'admin') {
        dispatch(fetchUsersAsync())
      } else {
        dispatch(fetchUsersWithIdAsync(user?._id))
      }
    }
  }, [user])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Typography component={'h2'} fontSize={'1.5rem'}>
            Users Credentials
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <UsersTable />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Users
