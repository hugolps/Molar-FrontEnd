// ** React Imports
import { useState, useContext } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'
import { useRouter } from 'next/router'


// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const imoveis = [
    {
      id: 1,
      usuario_id: 3,
      titulo: "Apartamento nos Bancarios",
      tipoImovel: 'apartamento',
      bairro: "Bancarios",
      area: 100,
      numeroQuartos: 3,
      numeroBanheiros: 2,
      numeroVagasGaragem: 1,
      preco: 160000,
      fotos: '/images/avatars/1.png',
    },
    {
      id: 2,
      usuario_id: 3,
      titulo: "Apartamento em Manaíra",
      preco: 450000,
      tipoImovel: 'apartamento',
      bairro: 'Manaíra',
      area: 92,
      numeroQuartos: 3,
      numeroBanheiros: 2,
      numeroVagasGaragem: 2,
      fotos: '/images/avatars/2.png',
    },
    {
      id: 3,
      usuario_id: 3,
      titulo: "Casa no Jardim Luna",
      preco: 900000,
      tipoImovel: 'casa',
      bairro: 'Jardim Luna',
      area: 150,
      numeroQuartos: 4,
      numeroBanheiros: 4,
      numeroVagasGaragem: 4,
      fotos: '/images/avatars/3.png',
    },
    {
      id: 4,
      usuario_id: 3,
      titulo: "Cobertura em Intermares",
      preco: 2000000,
      tipoImovel: 'cobertura',
      bairro: 'Intermares',
      area: 120,
      numeroQuartos: 3,
      numeroBanheiros: 4,
      numeroVagasGaragem: 3,
      fotos: '/images/avatars/4.png',
      usuario_id: 2
    },
    {
      id: 5,
      usuario_id: 3,
      titulo: "Apartamento no Bessa",
      preco: 350000,
      tipoImovel: 'apartamento',
      bairro: 'Bessa',
      area: 100,
      numeroQuartos: 2,
      numeroBanheiros: 3,
      numeroVagasGaragem: 2,
      fotos: '/images/avatars/5.png',
    },
    {
      id: 6,
      usuario_id: 3,
      titulo: "Apartamento no Altiplano",
      preco: 1200000,
      tipoImovel: 'apartamento',
      bairro: 'Altiplano',
      area: 60,
      numeroQuartos: 4,
      numeroBanheiros: 5,
      numeroVagasGaragem: 4,
      fotos: '/images/avatars/6.png',
    },
    {
      id: 7,
      usuario_id: 3,
      titulo: "Quitinete no Bessa",
      preco: 250.000,
      tipoImovel: 'quitinete',
      bairro: 'bessa',
      area: 30,
      numeroQuartos: 1,
      numeroBanheiros: 1,
      numeroVagasGaragem: 1,
      fotos: '/images/avatars/7.png',
    },
    
  ]

const CardWithCollapse = () => {
  // ** State
  const [collapse, setCollapse] = useState({})

  const {imovelId, setImovelId} = useContext(AuthContext)

  const router = useRouter()

  const handleClick = (id) => {
    setCollapse((prevState => ({...prevState, [id]: !prevState[id]})))
  }

  const handleEdit = (id) => {
    setImovelId(id)
    router.push('/catalogo-imoveis/edit')
  }

  return (

    <Grid container spacing={6}>
    {imoveis.map(imovel => (
        <Grid key={imovel.id} item xs={12} sm={6} md={4} lg={4} xl={3} sx={{ paddingBottom: 4 }}>
        <Card key={imovel.id} sx={{ marginBottom: 5, marginTop: 5 }}>
        <CardMedia sx={{ height: '14.5625rem' }} image={imovel.fotos} />
        <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
            {imovel.titulo}
            </Typography>
            <Typography variant='body2'>
            R$ {imovel.preco}
            </Typography>
        </CardContent>
        <CardActions className='card-action-dense'>
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            >
            <Button onClick={() => handleClick(imovel.id)}>Detalhes</Button>
            <IconButton size='small' onClick={() => handleClick(imovel.id)}>
                {collapse[imovel.id] ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
            </IconButton>
            </Box>
        </CardActions>
        <Collapse in={collapse[imovel.id]}>
            <Divider sx={{ margin: 0 }} />
            <CardContent>
            <Typography variant='body2'>
                Tipo do Imóvel: {imovel.tipoImovel},
            </Typography>
            <Typography variant='body2'>
                Bairro: {imovel.bairro},
            </Typography>
            <Typography variant='body2'>
                Area: {imovel.area} metros,
            </Typography>
            <Typography variant='body2'>
                Número de Quartos: {imovel.numeroQuartos},
            </Typography>
            <Typography variant='body2'>
                Número de Banheiros: {imovel.numeroBanheiros},
            </Typography>
            <Typography variant='body2'>
                Vagas de Garagem: {imovel.numeroVagasGaragem},
            </Typography>
            <Grid item  spacing={12} >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
              <Button onClick={() => handleEdit(imovel.id)} size="small" variant='contained' sx={{ marginRight: 3.5 }}>
                Editar
              </Button>
              <Button size="small" type='cancel' variant='outlined' color='error'>
                Excluir Imovel
              </Button>
            </Box>
          </Grid>

            </CardContent>
        </Collapse>
        </Card>
        </Grid>
    ))}
    </Grid>
  )
}

export default CardWithCollapse
