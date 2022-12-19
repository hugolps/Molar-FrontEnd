import { useState, useContext, useEffect, forwardRef } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import {isFormValid, onlyNumbers, validate} from 'src/validation/index.js'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ConsoleNetworkOutline } from 'mdi-material-ui'

// ** Icons Imports

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
  const [imgSrc, setImgSrc] = useState('/images/misc/triangle-dark.png')

  const [openAlert, setOpenAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState('')
  const [severity, setSeverity] = useState('')

  const router = useRouter()
  const parametro = router.query.id

  const [tipoImovel, setTipoImovel] = useState('')

  const handleChangeTipoImovel = (event) => {
    setTipoImovel(event.target.value);
  };

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
    userAuth,
    imovelId,
    setImovelId
   } = useContext(AuthContext)


  const [values, setValues] = useState({
    id: 0,
    preco: 0,
    tipoImovel: undefined,
    bairro: undefined,
    area: undefined,
    numeroQuartos: undefined,
    numeroBanheiros: undefined,
    numeroVagasGaragem: undefined,
    usuario_id: 0
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

  useEffect(() => {
    if (parametro){
      fetch(`http://localhost:8080/imoveis-desejados/${parametro}`)
      .then(response => {
          if(response.status === 200) {
            return response.json()
          }
        })
      .then(data => {
        setValues(data)
        setTipoImovel(data.tipoImovel)
      })
      .catch((error) => {
        console.log('Algo deu errado!', error)
      })
    }
  }, [parametro])



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

  const handleCancel = (id) => {
    setImovelId(id)
    router.push('/imoveis-desejados')
  }

  const handleEdit = () => {
    event.preventDefault()

    const updateValues = {
      id: values.id,
      tipoImovel: tipoImovel.trim(),
      preco: values.preco,
      bairro: values.bairro.trim(),
      area: values.area,
      numeroQuartos: values.numeroQuartos,
      numeroBanheiros: values.numeroBanheiros,
      numeroVagasGaragem: values.numeroVagasGaragem,
      usuario_id: values.usuario_id
    }

    fetch(`http://localhost:8080/imoveis-desejados/${values.id}`, {
      method: 'PUT',
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
        setMessageAlert('Imóvel editado com sucesso!')
        setSeverity('primary')
      })
      .then(data => {
        setTimeout(() => router.push('/imoveis-desejados'), 3000)
      })
      .catch((error) => {
        console.log('Algo deu errado!', error)
        setOpenAlert(true)
        setMessageAlert('ERRO: Imóvel não editado. Tente novamente!')
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
              label='Preço (R$)'
              placeholder='Preço'
              value={values.preco}
              required
              />
          </Grid>

          <Grid item xs={12} sm={6}>
          <TextField
              id="outlined-select-tipo-imovel"
              select
              label="Tipo do Imóvel"
              value={tipoImovel}
              onChange={handleChangeTipoImovel}
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
              // placeholder='Área'
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
              value={values.numeroQuartos}
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
              value={values.numeroBanheiros}
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
              value={values.numeroVagasGaragem}
              required
            />
          </Grid>

          <Grid item xs={12} spacing={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button disabled={!isFormValid(values)} onClick={handleEdit} variant='contained' sx={{ marginRight: 3.5 }}>
                Confirmar
              </Button>
              <Button onClick={handleCancel} type='cancel' variant='outlined' color='error'>
                Cancelar
              </Button>
            </Box>
          </Grid>
        </Grid>
    </CardContent>
    <Snackbar open={openAlert} autoHideDuration={(severity === "error" ? 6000 : 3000)} onClose={handleClose}>
    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
    {messageAlert}
    </Alert>
    </Snackbar>
    </>
  )
}

export default AdicionarImovel
