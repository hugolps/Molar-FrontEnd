import { useState, useContext, useEffect } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import {isFormValid, onlyNumbers, validate} from 'src/validation/index.js'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

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

const AdicionarImovel = () => {
  // ** States
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/misc/triangle-dark.png')
  
  const router = useRouter()

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

   console.log('Values: ', values)
   console.log('ImovelId: ', imovelId)
  
   const addressUpdate = JSON.parse(addressAuth)
   const userUpdate = JSON.parse(userAuth)

  const [values, setValues] = useState({
    titulo: 'Apartamento no Bessa',
    preco: 100000,
    tipoImovel: 'casa',
    bairro: 'bessa',
    area: 92,
    quartos: 3,
    banheiros: 2,
    vagasGaragem: 2,
    
  })

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

  const handleCancel = (id) => {
    setImovelId(id)
    router.push('/catalogo-imoveis')
  }

  const handleEdit = () => {
    event.preventDefault()
    console.log(addressAuth)

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
            numero_residencia: onlyNumbers(values.numero.trim()),
            cep: onlyNumbers(values.cep.trim())
        }
      }
    }

    fetch(`http://localhost:3000/api/v1/usuarios/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': `Bearer ${JSON.parse(auth)}`
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
        Authorization: userInfo.Authorization
      }))
      .catch((error) => {
        console.log('Algo deu errado!', error)
      })
  }


  return (

  <CardContent>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              onChange={event => handleChange('titulo')}
              label='Título do Anúncio'
              placeholder='Título do Anúncio'
              value={values.titulo}
              required
               />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              onChange={event => handleChange('preco')}
              label='Preço (R$)'
              placeholder='Preço'
              value={values.preco}
              required
               />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              onChange={handleChange('tipoImovel')}
              label='Tipo do Imóvel'
              placeholder='Tipo do Imóvel'
              defaultValue=''
              value={values.tipoImovel}
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
              type='number'
              onChange={handleChange('area')}
              label='Área (m2)'
              placeholder='Área'
              value={values.area}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              onChange={handleChange('quartos')}
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
              onChange={handleChange('banheiros')}
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
              onChange={handleChange('VagasGaragem')}
              label='Vagas de Garagem'
              placeholder='Vagas de Garagem'
              value={values.vagasGaragem}
              required
            />
          </Grid>

          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Adicionar Nova Foto
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/misc/triangle-dark.png')}>
                  Deletar Fotos
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
              <Box sx={{ marginLeft: 5 }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} spacing={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button onClick={handleEdit} variant='contained' sx={{ marginRight: 3.5 }}>
                Confirmar
              </Button>
              <Button onClick={handleCancel} type='cancel' variant='outlined' color='error'>
                Cancelar
              </Button>
            </Box>
          </Grid>
        </Grid>
    </CardContent>
  )
}

export default AdicionarImovel
