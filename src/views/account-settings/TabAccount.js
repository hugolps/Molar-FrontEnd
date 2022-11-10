// ** React Imports
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'
import Cookies from 'js-cookie'
import {isFormValid, onlyNumbers, validate} from 'src/validation/index.js'

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


const TabAccount = () => {
  // ** States
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  // const {errors, setErrors} = useContext(AuthContext)
  const {userInfo, setUserInfo} = useContext(AuthContext)
  const { user, setUser } = useContext(AuthContext)
  const { address, setAddress } = useContext(AuthContext)

  // const [userInfoEdit, setUserInfoEdit] = useState(userInfo)
  // const [userEdit, setUserEdit] = useState(user)
  // const [addressEdit, setAddressEdit] = useState(address)

  const [values, setValues] = useState({
    nome: user.nome,
    email: user.email,
    telefone: user.telefone,
    logradouro: address.logradouro,
    bairro: address.bairro,
    numero_residencia: address.numero_residencia,
    cep: address.cep,
    cpf: user.cpf,
  })

  useEffect(() => {
    console.log(Cookies.get('Usuário'))
  },[])

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    // console.log(event.target.value)
  }

  const handleEdit = () => {
    event.preventDefault()
    console.log(address)
    const updateValues = {
      usuario: {
        id: user.id,
        email: values.email.trim(),
        nome: values.nome.trim(),
        telefone: onlyNumbers(values.telefone.trim()),
        cpf: onlyNumbers(values.cpf.trim()),
        endereco_attributes: {
            id: address.id,
            usuario_id: user.id,
            logradouro: values.logradouro.trim(),
            bairro: values.bairro.trim(),
            numero_residencia: onlyNumbers(values.numero_residencia.trim()),
            cep: onlyNumbers(values.cep.trim())
        }
      }
    }

    fetch(`http://localhost:3000/api/v1/usuarios/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(updateValues)
    })
      .then(response => {
          if(response.status === 200) {
          response.json()
          }
        })
      .then(data => setUserInfo({
        usuario: updateValues.usuario,
        endereco: updateValues.usuario.endereco,
        Authorization: userInfo.Authorization
      }))
      .catch((error) => {
        console.log('Algo deu errado!', error)
      })
  }


  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              onChange={event => handleChange('nome')}
              label='Nome Completo'
              placeholder='Nome Completo'
              // defaultValue=''
              defaultValue={values.nome}
              required
               />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              onChange={handleChange('telefone')}
              label='Telefone'
              placeholder='(XX) XXXXX-XXXX'
              value={values.telefone}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              onChange={handleChange('email')}
              label='Email'
              placeholder='Email'
              defaultValue=''
              value={values.email}
              required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              onChange={handleChange('logradouro')}
              label='Logradouro'
              placeholder='Logradouro'
              defaultValue=''
              value={values.logradouro}
              required
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              onChange={handleChange('bairro')}
              label='Bairro'
              placeholder='Bairro'
              value={values.bairro}
              required
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              onChange={handleChange('numero')}
              label='Número da Residência'
              placeholder='Número da Residência'
              value={values.numero_residencia}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            fullWidth
            type='text'
            onChange={handleChange('cep')}
            label='CEP'
            placeholder='CEP'
            value={values.cep}
            required />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField
              fullWidth
              type='text'
              onChange={handleChange('cpf')}
              label='CPF'
              placeholder='CPF'
              value={values.cpf}
              required
              disabled/>
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
              <Button onClick={handleEdit} variant='contained' sx={{ marginRight: 3.5 }}>
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
