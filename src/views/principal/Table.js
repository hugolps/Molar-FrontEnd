import { useState, useContext, useEffect, forwardRef } from 'react'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';



const ButtonStyled = styled(Button)(({ theme }) => ({
  fontSize: '.7rem',
}))


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImoveisTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { userAuth } = useContext(AuthContext)
  const [imoveis, setImoveis] = useState([])
  const [imovelID, setImovelID] = useState()

  const {
    imovelId,
    setImovelId
   } = useContext(AuthContext)

  const router = useRouter()

  useEffect(() => {
    if (userAuth && userAuth !== {} && userAuth !== undefined){

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
    router.push(`/editImoveis/${id}`)
  }

  const handleDelete = (id) => {
    if (userAuth){
      fetch(`http://localhost:8080/imoveis-desejados/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
          if(response.status === 200) {
            return response.json()
          }
        })
      .then(data => {
        const index = imoveis.findIndex((obj) => obj.id === id)
        const arr = [...imoveis]
        setImoveis(arr.filter(obj => obj.id !== id))
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log('Algo deu errado!', error)
      })
    }
  }

  const handleClickOpen = (id) => {
    setImovelID(id)
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleMatches = (id) => {
    router.push(`/matches/${id}`);
  };

  return (
    <>
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Tipo do Imóvel</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Área (m²)</TableCell>
              <TableCell>Quartos</TableCell>
              <TableCell>Banheiros</TableCell>
              <TableCell>Vagas Garagem</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {imoveis?.map(imovel => (
              <TableRow hover key={imovel.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{imovel.tipoImovel}</Typography>
                    {/* <Typography variant='caption'>{row.designation}</Typography> */}
                  </Box>
                </TableCell>
                <TableCell>R$ {imovel.preco.toFixed(2)}</TableCell>
                <TableCell>{imovel.bairro}</TableCell>
                <TableCell>{imovel.area}</TableCell>
                <TableCell>{imovel.numeroQuartos}</TableCell>
                <TableCell>{imovel.numeroBanheiros}</TableCell>
                <TableCell>{imovel.numeroVagasGaragem}</TableCell>
                <TableCell>
                  <ButtonStyled size="small" variant="contained" color="primary" disabled={!imovel.hasMatches} onClick={() => handleMatches(imovel.id)}>
                    Matches
                  </ButtonStyled>
                </TableCell>
                <TableCell>
                <Grid item xs={6} spacing={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton variant="outlined" color="primary">
                      <EditIcon onClick={() => handleEdit(imovel.id)}/>
                    </IconButton>
                    <IconButton variant="outlined" color="error" onClick={() => handleClickOpen(imovel.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                  <Dialog
                    open={openDialog}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Deseja mesmo excluir imóvel?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {/* Deseja mesmo excluir imóvel? */}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Não</Button>
                      <Button onClick={() => handleDelete(imovelID)} autoFocus>
                        Sim
                      </Button>
                    </DialogActions>
                  </Dialog>
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

    </>
  )
}

export default ImoveisTable
