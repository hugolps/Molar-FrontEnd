// ** React Imports
import { useState, Fragment, useEffect, useContext } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    nome: '',
    email: '',
    password: '',
    telefone: '',
    logradouro: '',
    bairro: '',
    numero: '',
    cep: '',
    cpf: '',
    showPassword: false,
  })
  const [errors, setErrors] = useState({})
  const [validated, setValidated] = useState(false)
  const [checked, setChecked] = useState(false)

  const {userInfo, setUserInfo} = useContext(AuthContext)


  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleRegister = () => {
    event.preventDefault()

    const registerValues = {
      usuario: {
        email: values.email.trim(),
        password: values.password.trim(),
        nome: values.nome.trim(),
        telefone: onlyNumbers(values.telefone.trim()),
        cpf: onlyNumbers(values.cpf.trim()), 
        endereco_attributes: {
            logradouro: values.logradouro.trim(),
            bairro: values.bairro.trim(),
            numero_residencia: onlyNumbers(values.numero.trim()),
            cep: onlyNumbers(values.cep.trim())
        }
      }
    }

    fetch(`http://0.0.0.0:3000/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(registerValues)
    })
      .then(response => {
          if(response.status === 200) {
          response.json()
          }
        })
      .then(data => setUserInfo(registerValues))
      .catch((error) => {
        console.log('Algo deu errado!', error)
      })      
  }

  const onlyNumbers = (text) => {
    const numbers = text.replace(/[^\d]/g, "")
  
    return numbers
  }

  useEffect(() => {
  }, [validated])

  const handleChecked = (event) => {
    setChecked(current => !current)
  }

  const isFormValid = () => {
    return (values.nome && 
            values.email && 
            values.password && 
            values.telefone && 
            values.logradouro &&
            values.bairro &&
            values.numero &&
            values.cep &&
            values.cpf &&
            checked === true)
  }

  const validate = (fieldValues = values) => {

    setValidated(true)
    
    if (temp == {}) console.log('Prencha o formulário')

    let temp = {...errors}

    if ('nome' in fieldValues)
     temp.nome = values.nome ? "" : "É necessário preencher este campo."

    if ('email' in fieldValues)
     temp.email = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(fieldValues.email) ? "" : "Este email não é válido."
    
    if ('telefone' in fieldValues)
     temp.telefone = (/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/).test(fieldValues.telefone) ? "" : "O telefone deve ter no mínimo 11 dígitos (apenas números)"
    
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? "" : "É necessário preencher o campo Password"
    
    if ('logradouro' in fieldValues) 
      temp.logradouro = fieldValues.logradouro ? "" : "É necessário preencher o campo Logradouro"
    
    if ('bairro' in fieldValues)
      temp.bairro = fieldValues.bairro ? "" : "É necessário preencher o campo Bairro"
    
    if ('numero' in fieldValues)
      temp.numero = !(/[^\d]/).test(fieldValues.numero) ? "" : "Preencha o campo Número adequadamente"
    
    if ('cep' in fieldValues)
      temp.cep = (/^([\d]{2})\.*([\d]{3})-*([\d]{3})/).test(fieldValues.cep) ? "" : "Preencha o campo CEP adequadamente"
    
    if ('cpf' in fieldValues)
      temp.cpf = (/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/).test(fieldValues.cpf) ? "" : "Preencha o campo CPF adequadamente"

    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    if(validate()) {
      handleRegister()
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width={35}
              height={29}
              version='1.1'
              viewBox='0 0 30 23'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                  <g id='logo' transform='translate(95.000000, 50.000000)'>
                    <path
                      id='Combined-Shape'
                      fill={theme.palette.primary.main}
                      d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                      transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                    />
                    <polygon
                      id='Rectangle'
                      opacity='0.077704'
                      fill={theme.palette.common.black}
                      points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                      transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.15'
                      fill={theme.palette.common.white}
                      d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                    />
                    <path
                      id='Rectangle'
                      fillOpacity='0.35'
                      fill={theme.palette.common.white}
                      transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                      d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                    />
                  </g>
                </g>
              </g>
            </svg>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Sinta-se em casa!
            </Typography>
            <Typography variant='body2'>Cadastre-se para encontrar os melhores imóveis!</Typography>
          </Box>
          <form 
            // noValidate 
            autoComplete='off' 
            onSubmit={handleSubmit}
          >
            <Grid container spacing={7}>
              <Grid item xs={12} sm={12}>
                <TextField 
                  fullWidth 
                  label='Nome'
                  value={values.nome}
                  onChange={handleChange('nome')}
                  placeholder='Nome Completo' 
                  required
                  error={errors.nome && validated}
                  helperText={errors.nome} 
                  />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField 
                  fullWidth 
                  type='text' 
                  label='Email'
                  value={values.email}
                  onChange={handleChange('email')} 
                  placeholder='Email'
                  required 
                  error={errors.email && validated}
                  helperText={errors.email}
                  />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel 
                  required 
                  htmlFor='auth-register-password'
                  >
                    Senha
                  </InputLabel>
                  <OutlinedInput
                    label='Password'
                    id='auth-register-password'
                    value={values.password}
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    error={errors.password && validated}
                    // helperText={errors.password}
                    required
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label='toggle password visibility'
                        >
                          {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  type='text'
                  value={values.telefone}
                  onChange={handleChange('telefone')}
                  label='Telefone'
                  placeholder='(XX) XXXXX-XXXX'
                  error={errors.telefone && validated}
                  helperText={errors.telefone}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField 
                  fullWidth 
                  type='text'
                  value={values.logradouro}
                  onChange={handleChange('logradouro')}
                  label='Logradouro' 
                  placeholder='Logradouro'
                  error={errors.logradouro && validated}
                  helperText={errors.logradouro} 
                  required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  type='text' 
                  value={values.bairro}
                  onChange={handleChange('bairro')}
                  label='Bairro' 
                  placeholder='Bairro'
                  error={errors.bairro && validated}
                  helperText={errors.bairro}  
                  required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  type='text'
                  value={values.numero}
                  onChange={handleChange('numero')} 
                  label='Número' 
                  placeholder='Número'
                  error={errors.numero && validated}
                  helperText={errors.numero}   
                  required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  type='text'
                  value={values.cep}
                  onChange={handleChange('cep')} 
                  label='CEP' 
                  placeholder='CEP'
                  error={errors.cep && validated}
                  helperText={errors.cep}  
                  required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  type='text'
                  value={values.cpf}
                  onChange={handleChange('cpf')}  
                  label='CPF' 
                  placeholder='CPF'
                  error={errors.cpf && validated}
                  helperText={errors.cpf}   
                  required />
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControlLabel
                  control={<Checkbox value={checked} onChange={handleChecked} required/>}
                  label={
                    <Fragment>
                      <span>Eu concordo com </span>
                      <Link href='/' passHref>
                        <LinkStyled onClick={e => e.preventDefault()}>as políticas & termos de privacidade</LinkStyled>
                      </Link>
                    </Fragment>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button disabled={!isFormValid()} fullWidth size='large' type='submit' onClick={handleSubmit} variant='contained' sx={{ marginBottom: 7 }}>
                  Cadastrar
                </Button>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Typography variant='body2' sx={{ marginRight: 2 }}>
                    Já tem conta?
                  </Typography>
                  <Typography variant='body2'>
                    <Link passHref href='/pages/login'>
                      <LinkStyled>Então faça o login aqui</LinkStyled>
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
