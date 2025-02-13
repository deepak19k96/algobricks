/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabSecurity from 'src/views/account-settings/TabSecurity'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabInfo from 'src/views/account-settings/TabInfo'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import { updateUserProfileAsync } from 'src/store/authSlice'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  // ** State
  const [userData, setUserData] = useState(user)
  const [value, setValue] = useState('account')

  useEffect(() => {
    setUserData(user)
  }, [user])

  const handleUpdateProfile = () => {
    dispatch(updateUserProfileAsync(userData))
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleFieldChange = e => {
    const { name, value } = e.target
    setUserData(prevUser => ({
      ...prevUser,
      [name]: value
    }))
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          {/*   <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />  */}
          <Tab
            value='api-details'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Api Details</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount
            userData={userData}
            setUserData={setUserData}
            handleUpdateProfile={handleUpdateProfile}
            handleFieldChange={handleFieldChange}
          />
        </TabPanel>
        {/*  <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity
            userData={userData}
            setUserData={setUserData}
            handleUpdateProfile={handleUpdateProfile}
            handleFieldChange={handleFieldChange}
          />
          </TabPanel> */}
        <TabPanel sx={{ p: 0 }} value='api-details'>
          <TabSecurity
            userData={userData}
            setUserData={setUserData}
            handleUpdateProfile={handleUpdateProfile}
            handleFieldChange={handleFieldChange}
          />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default AccountSettings
