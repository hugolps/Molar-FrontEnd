// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

//\(?([0-9]{2,3}|0{1}((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{4,5}[- ]*[0-9]{4}
const isNumber = (str) => /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/.test(str)

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [validNumber, setValidNumber] = useState('')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  function onlynumber(evt) {
    var theEvent = evt || window.event
    var key = theEvent.keyCode || theEvent.which
    key = String.fromCharCode(key)
    var regex = /^[0-9.]+$/
    if (!regex.test(key)) {
      theEvent.returnValue = false
      if (theEvent.preventDefault) theEvent.preventDefault()
    }
  }

  const handleValidNumber = event => {
    const result = toString(event.target.value).replace(/[^\d]/g, '')
    setValidNumber(result)
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>  
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Nome Completo' placeholder='Nome Completo' defaultValue='' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              validate={isNumber}
              onChange={() => onlynumber}
              label='Telefone'
              placeholder='(XX) XXXXX-XXXX'
              value={validNumber}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='email' label='Email' placeholder='Email' defaultValue='' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Logradouro' placeholder='Logradouro' defaultValue='' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Bairro' placeholder='Bairro' defaultValue='' required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              label='Número da Residência'
              placeholder='Número da Residência'
              defaultValue=''
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='CEP' placeholder='CEP' defaultValue='' required />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField fullWidth type='text' label='CPF' placeholder='CPF' defaultValue='' required disabled/>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue='admin'>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='author'>Author</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' defaultValue='active'>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' defaultValue='ABC Pvt. Ltd.' />
          </Grid> */}

          {/* {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null} */}

          <Grid item xs={12} spacing={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button variant='contained' sx={{ marginRight: 3.5 }}>
                Salvar Alterações
              </Button>
              <Button type='cancel' variant='outlined' color='error'>
                Cancelar
              </Button>
            </Box>

            <Box>
              <Button variant='contained' color='error'>
                Excluir Conta
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
