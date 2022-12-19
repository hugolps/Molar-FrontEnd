// ** React Imports
import { useState, useContext, useEffect, forwardRef } from 'react'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Matches = () => {

    // const imoveis = [
    //     {
    //         "id": 7,
    //         "titulo": "Casa Manaira",
    //         "tipoImovel": "CASA",
    //         "bairro": "Manaira",
    //         "area": 180.0,
    //         "numeroQuartos": 2,
    //         "numeroBanheiros": 3,
    //         "numeroVagasGaragem": 2,
    //         "preco": 300000,
    //         "extras": null,
    //         "usuario_id": 50,
    //         "usuario": null
    //     },
    //     {
    //         "id": 8,
    //         "titulo": "Casa Bessa",
    //         "tipoImovel": "CASA",
    //         "bairro": "Bessa",
    //         "area": 200.0,
    //         "numeroQuartos": 4,
    //         "numeroBanheiros": 4,
    //         "numeroVagasGaragem": 4,
    //         "preco": 200000,
    //         "extras": null,
    //         "usuario_id": 31,
    //         "usuario": null
    //     },
    //     {
    //         "id": 9,
    //         "titulo": "Localidade no alto do mateus",
    //         "tipoImovel": "APARTAMENTO",
    //         "bairro": "Alto do gambé",
    //         "area": 100.0,
    //         "numeroQuartos": 3,
    //         "numeroBanheiros": 2,
    //         "numeroVagasGaragem": 1,
    //         "preco": 1600,
    //         "extras": null,
    //         "usuario_id": 27,
    //         "usuario": null
    //     },
    //     {
    //         "id": 10,
    //         "titulo": "Casa Manaira",
    //         "tipoImovel": "CASA",
    //         "bairro": "Manaira",
    //         "area": 180.0,
    //         "numeroQuartos": 2,
    //         "numeroBanheiros": 3,
    //         "numeroVagasGaragem": 2,
    //         "preco": 300000,
    //         "extras": null,
    //         "usuario_id": 50,
    //         "usuario": null
    //     },
    //     {
    //         "id": 11,
    //         "titulo": "Casa Bessa",
    //         "tipoImovel": "CASA",
    //         "bairro": "Bessa",
    //         "area": 200.0,
    //         "numeroQuartos": 4,
    //         "numeroBanheiros": 4,
    //         "numeroVagasGaragem": 4,
    //         "preco": 200000,
    //         "extras": null,
    //         "usuario_id": 31,
    //         "usuario": null
    //     },
    //     {
    //         "id": 12,
    //         "titulo": "Localidade no alto do mateus",
    //         "tipoImovel": "APARTAMENTO",
    //         "bairro": "Alto do gambé",
    //         "area": 100.0,
    //         "numeroQuartos": 3,
    //         "numeroBanheiros": 2,
    //         "numeroVagasGaragem": 1,
    //         "preco": 1600,
    //         "extras": null,
    //         "usuario_id": 27,
    //         "usuario": null
    //     },
    //     {
    //         "id": 13,
    //         "titulo": "Casa Manaira",
    //         "tipoImovel": "CASA",
    //         "bairro": "Manaira",
    //         "area": 180.0,
    //         "numeroQuartos": 2,
    //         "numeroBanheiros": 3,
    //         "numeroVagasGaragem": 2,
    //         "preco": 300000,
    //         "extras": null,
    //         "usuario_id": 50,
    //         "usuario": null
    //     },
    //     {
    //         "id": 14,
    //         "titulo": "Casa Bessa",
    //         "tipoImovel": "CASA",
    //         "bairro": "Bessa",
    //         "area": 200.0,
    //         "numeroQuartos": 4,
    //         "numeroBanheiros": 4,
    //         "numeroVagasGaragem": 4,
    //         "preco": 200000,
    //         "extras": null,
    //         "usuario_id": 31,
    //         "usuario": null
    //     },
    //     {
    //         "id": 15,
    //         "titulo": "Localidade no alto do mateus",
    //         "tipoImovel": "APARTAMENTO",
    //         "bairro": "Alto do gambé",
    //         "area": 100.0,
    //         "numeroQuartos": 3,
    //         "numeroBanheiros": 2,
    //         "numeroVagasGaragem": 1,
    //         "preco": 1600,
    //         "extras": null,
    //         "usuario_id": 27,
    //         "usuario": null
    //     },
    // ]

// ** State
  const [collapse, setCollapse] = useState({})

  const [imovelID, setImovelID] = useState()
//   const {imovelId, setImovelId} = useContext(AuthContext)
  const { userAuth } = useContext(AuthContext)
  const [imoveis, setImoveis] = useState([])

  const [openDialog, setOpenDialog] = useState(false);

  const router = useRouter()

  const parametro = router.query.id

  useEffect(() => {
    if (userAuth){
      fetch(`http://localhost:8080/imoveis-desejados/${parametro}/matches`, )
      .then(response => {
          if(response.status === 200) {
            return response.json()
          }
        })
      .then(data => setImoveis(data))
      .catch((error) => {
        console.log('Algo deu errado!', error)
      })
    }
  }, [userAuth])

  const handleClick = (id) => {
    setCollapse((prevState => ({...prevState, [id]: !prevState[id]})))
  }

  const handleClickOpen = (id) => {
    setImovelID(id)
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (

    <Grid container spacing={6}>
    {imoveis?.map(imovel => (
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
            </CardContent>
        </Collapse>
        </Card>
        </Grid>
    ))}
    </Grid>
  )
}

export default Matches
