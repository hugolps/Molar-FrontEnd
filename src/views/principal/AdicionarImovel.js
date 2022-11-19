import { useState, useContext, useEffect } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'
import Cookies from 'js-cookie'
import {isFormValid, onlyNumbers, validate} from 'src/validation/index.js'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// ** Icons Imports


const AdicionarImovel = () => {
  // ** States
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

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

   console.log('Values: ', values)
  
   const addressUpdate = JSON.parse(addressAuth)
   const userUpdate = JSON.parse(userAuth)

  const [values, setValues] = useState({
    valor: 100.000,
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
              onChange={event => handleChange('valor')}
              label='Valor (R$)'
              placeholder='Valor'
              defaultValue={''}
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
          
          <Grid item xs={12} spacing={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Button onClick={handleEdit} variant='contained' sx={{ marginRight: 3.5 }}>
                Adicionar
              </Button>
              <Button type='cancel' variant='outlined' color='error'>
                Cancelar
              </Button>
            </Box>
          </Grid>
        </Grid>
    </CardContent>
  )
}

export default AdicionarImovel
