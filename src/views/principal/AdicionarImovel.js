import { useState, useContext, useEffect, forwardRef } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'
import Cookies from 'js-cookie'
import {isFormValid, onlyNumbers, validate} from 'src/validation/index.js'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

// ** Icons Imports

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const tipoImoveis = [
  {value: "", label: "Tipo do Imóvel"},
  {value: "APARTAMENTO", label: "Apartamento"},
  {value: "CASA", label: "Casa"},
  {value: "KITNET", label: "Kitnet"}

]

const AdicionarImovel = () => {
  // ** States
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const [openAlert, setOpenAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState('')
  const [severity, setSeverity] = useState('')

  const [tipoImovel, setTipoImovel] = useState('')



  const {
    userInfo,
    setUserInfo,
    user,
    setUser,
    address,
    setAddress,
    auth,
    setAuth,
    addressAuth,
    setAddressAuth,
    userAuth
  } = useContext(AuthContext)

    const [values, setValues] = useState({
      preco: 0,
      tipoImovel: undefined,
      bairro: undefined,
      area: undefined,
      numeroQuartos: undefined,
      numeroBanheiros: undefined,
      numeroVagasGaragem: undefined,
    })

    const isFormValid = (values) => {
      return (values.preco &&
              values.tipoImovel &&
              values.bairro &&
              values.area &&
              values.numeroQuartos &&
              values.numeroBanheiros &&
              values.numeroBanheiros &&
              values.numeroVagasGaragem
              )
    }

  console.log('Values: ', values)


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
  }

  const handleEdit = () => {
    event.preventDefault()

    const updateValues = {
      tipoImovel: values.tipoImovel.trim(),
      preco: values.preco.trim(),
      bairro: values.bairro.trim(),
      area: values.area.trim(),
      numeroQuartos: values.numeroQuartos.trim(),
      numeroBanheiros: values.numeroBanheiros.trim(),
      numeroVagasGaragem: values.numeroVagasGaragem.trim(),
      usuario_id: JSON.parse(userAuth).id
    }

    fetch(`http://localhost:8080/imoveis-desejados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(updateValues)
    })
      .then(response => {
          if(response.status === 200) {
          return response.json()
          }

          return Promise.reject(response)
        })
      // .then(data => setUserInfo({
      //   usuario: updateValues.usuario,
      //   Authorization: userInfo.Authorization
      // }))
      .then(data => {
        setOpenAlert(true)
        setMessageAlert('Imóvel cadastrado com sucesso!')
        setSeverity('primary')
      })
      .catch((error) => {
        console.log('Algo deu errado!', error)
        setOpenAlert(true)
        setMessageAlert('ERRO: Imóvel não cadastrado. Tente novamente!')
        setSeverity('error')
      })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };


  return (

  <>
  <CardContent>

        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              onChange={handleChange('preco')}
              label='Valor (R$)'
              placeholder='Valor'
              defaultValue={''}
              required
              />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-select-tipo-imovel"
              select
              label="Tipo do Imóvel"
              value={values.tipoImovel}
              onChange={handleChange('tipoImovel')}
              fullWidth
              required
            >
              {tipoImoveis.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
              type='number'
              onChange={handleChange('area')}
              label='Área (m²)'
              placeholder='Área'
              value={values.area}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              onChange={handleChange('numeroQuartos')}
              label='Número de Quartos'
              placeholder='Número de Quartos'
              value={values.quartos}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              onChange={handleChange('numeroBanheiros')}
              label='Banheiros'
              placeholder='Banheiros'
              value={values.banheiros}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              onChange={handleChange('numeroVagasGaragem')}
              label='Vagas de Garagem'
              placeholder='Vagas de Garagem'
              value={values.vagasGaragem}
              required
            />
          </Grid>

          <Grid item xs={12} spacing={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button disabled={!isFormValid(values)} onClick={handleEdit} variant='contained' sx={{ marginRight: 3.5 }}>
                Adicionar
              </Button>
              <Button type='cancel' variant='outlined' color='error'>
                Cancelar
              </Button>
            </Box>
          </Grid>
        </Grid>
    </CardContent>
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
    {messageAlert}
    </Alert>
    </Snackbar>
    </>
  )
}

export default AdicionarImovel
