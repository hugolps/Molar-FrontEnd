// ** React Imports
import { useState } from 'react'

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
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100,
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
  // ** State
  const [value, setValue] = useState('account')

  // useEffect(() => {
  //     const teste = fetch(`http://localhost:3000/api/v1/usuarios/${usuarioId}`, {
  //   headers: {
  //     "Accept": "application/json",
  //     // "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOSIsInNjcCI6InVzdWFyaW8iLCJhdWQiOm51bGwsImlhdCI6MTY2NjExNDk4MSwiZXhwIjoxNjY3NDEwOTgxLCJqdGkiOiJmZTQzZjgyNS1mMWM4LTRmZmUtYmQxYi1iZTg1MjE5NWI1MGIifQ.kvxSvASaYtlD35Z6Wlw_D1oLw54y4zz65-8GW3rBwDw"
  //   },
  // })
  //  .then(response => response.json())
  //  .then(data => console.log(data))
  // })



  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // const teste = fetch("http://localhost:3000/api/v1/usuarios/19", {
  //   headers: {
  //     "Accept": "application/json",
  //     // "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOSIsInNjcCI6InVzdWFyaW8iLCJhdWQiOm51bGwsImlhdCI6MTY2NjExNDk4MSwiZXhwIjoxNjY3NDEwOTgxLCJqdGkiOiJmZTQzZjgyNS1mMWM4LTRmZmUtYmQxYi1iZTg1MjE5NWI1MGIifQ.kvxSvASaYtlD35Z6Wlw_D1oLw54y4zz65-8GW3rBwDw"
  //   },
  // })
  //  .then(response => response.json())
  //  .then(data => console.log(data))

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
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <AccountOutline />
                <TabName>Conta</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Senha</TabName>
              </Box>
            }
          />
          {/* <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          /> */}
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>
        {/* <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo />
        </TabPanel> */}
      </TabContext>
    </Card>
  )
}

export default AccountSettings
