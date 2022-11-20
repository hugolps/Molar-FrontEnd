// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

// ** Demo Tabs Imports
import TabInfo from 'src/views/principal/MeusImoveis'
import AdicionarImovel from 'src/views/principal/AdicionarImovel'

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

const Dashboard = () => {
    // ** State
    const [value, setValue] = useState('meus-imoveis')

    const router = useRouter()


  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='principal tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='meus-imoveis'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <HomeWorkOutlinedIcon />
                <TabName>Meus Imoveis</TabName>
              </Box>
            }
          />
          <Tab
            value='buscar-imoveis'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AddOutlinedIcon />
                <TabName>Adicionar Imóvel</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='meus-imoveis'>
          <TabInfo />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='buscar-imoveis'>
          <AdicionarImovel />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default Dashboard
