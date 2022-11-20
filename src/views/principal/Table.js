import { useState, useContext, useEffect } from 'react'
import { AuthContext } from 'src/contexts/AuthContext'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'



const ButtonStyled = styled(Button)(({ theme }) => ({
  fontSize: '.7rem',
}))



// const imoveis = [
//   {
//     id: 1,
//     valor: 100000,
//     tipoImovel: 'quitinete',
//     bairro: 'Bessa',
//     area: 32,
//     quartos: 1,
//     banheiros: 1,
//     vagasGaragem: 0,
//   },
//   {
//     id: 2,
//     valor: 450000,
//     tipoImovel: 'apartamento',
//     bairro: 'Manaíra',
//     area: 92,
//     quartos: 3,
//     banheiros: 2,
//     vagasGaragem: 2,
//   },
//   {
//     id: 3,
//     valor: 900000,
//     tipoImovel: 'casa',
//     bairro: 'Jardim Luna',
//     area: 150,
//     quartos: 4,
//     banheiros: 4,
//     vagasGaragem: 4,
//   },
//   {
//     id: 4,
//     valor: 2000000,
//     tipoImovel: 'cobertura',
//     bairro: 'Intermares',
//     area: 120,
//     quartos: 3,
//     banheiros: 4,
//     vagasGaragem: 3,
//   },
//   {
//     id: 5,
//     valor: 350000,
//     tipoImovel: 'apartamento',
//     bairro: 'Bessa',
//     area: 100,
//     quartos: 2,
//     banheiros: 3,
//     vagasGaragem: 2,
//   },
//   {
//     id: 6,
//     valor: 1200000,
//     tipoImovel: 'apartamento',
//     bairro: 'Altiplano',
//     area: 60,
//     quartos: 4,
//     banheiros: 5,
//     vagasGaragem: 4,
//   },
//   {
//     id: 7,
//     valor: 250.000,
//     tipoImovel: 'quitinete',
//     bairro: 'bessa',
//     area: 30,
//     quartos: 1,
//     banheiros: 1,
//     vagasGaragem: 1,
//   },

// ]

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const ImoveisTable = () => {

  const { userAuth } = useContext(AuthContext)
  const [imoveis, setImoveis] = useState([]);

  const {
    imovelId,
    setImovelId
   } = useContext(AuthContext)

  const router = useRouter()


  useEffect(() => {
    if (userAuth){
      fetch(`http://localhost:8080/imoveis-desejados/usuario/${JSON.parse(userAuth).id}`, )
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


  const handleEdit = (id) => {
    setImovelId(id)
    router.push('/editImoveis')
  }

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Tipo do Imóvel</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Área</TableCell>
              <TableCell>Quartos</TableCell>
              <TableCell>Banheiros</TableCell>
              <TableCell>Vagas Garagem</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {imoveis.map(imovel => (
              <TableRow hover key={imovel.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{imovel.tipoImovel}</Typography>
                    {/* <Typography variant='caption'>{row.designation}</Typography> */}
                  </Box>
                </TableCell>
                <TableCell>{imovel.preco}</TableCell>
                <TableCell>{imovel.bairro}</TableCell>
                <TableCell>{imovel.area}</TableCell>
                <TableCell>{imovel.numeroQuartos}</TableCell>
                <TableCell>{imovel.numeroBanheiros}</TableCell>
                <TableCell>{imovel.numeroVagasGaragem}</TableCell>
                <TableCell>
                  <ButtonStyled size="small" variant="contained" color="primary" disabled>
                    Matches
                  </ButtonStyled>
                </TableCell>
                <TableCell>
                <Grid item xs={6} spacing={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton variant="outlined" color="primary">
                      <EditIcon onClick={() => handleEdit(imovel.id)}/>
                    </IconButton>
                    <IconButton variant="outlined" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </TableCell>
                {/* <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default ImoveisTable
