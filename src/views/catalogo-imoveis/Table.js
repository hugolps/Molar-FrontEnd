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


const ButtonStyled = styled(Button)(({ theme }) => ({
  fontSize: '.7rem',
}))


const rows = [
  {
    age: 27,
    status: 'current',
    date: '09/27/2018',
    name: 'Sally Quinn',
    salary: '$19586.23',
    email: 'eebsworth2m@sbwire.com',
    designation: 'Human Resources Assistant'
  },
  {
    age: 61,
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'professional',
    name: 'Margaret Bowers',
    email: 'kocrevy0@thetimes.co.uk',
    designation: 'Nuclear Power Engineer'
  },
  {
    age: 59,
    date: '10/15/2017',
    name: 'Minnie Roy',
    status: 'rejected',
    salary: '$18991.67',
    email: 'ediehn6@163.com',
    designation: 'Environmental Specialist'
  },
  {
    age: 30,
    date: '06/12/2018',
    status: 'resigned',
    salary: '$19252.12',
    name: 'Ralph Leonard',
    email: 'dfalloona@ifeng.com',
    designation: 'Sales Representative'
  },
  {
    age: 66,
    status: 'applied',
    date: '03/24/2018',
    salary: '$13076.28',
    name: 'Annie Martin',
    designation: 'Operator',
    email: 'sganderton2@tuttocitta.it'
  },
  {
    age: 33,
    date: '08/25/2017',
    salary: '$10909.52',
    name: 'Adeline Day',
    status: 'professional',
    email: 'hnisius4@gnu.org',
    designation: 'Senior Cost Accountant'
  },
  {
    age: 61,
    status: 'current',
    date: '06/01/2017',
    salary: '$17803.80',
    name: 'Lora Jackson',
    designation: 'Geologist',
    email: 'ghoneywood5@narod.ru'
  },
  {
    age: 22,
    date: '12/03/2017',
    salary: '$12336.17',
    name: 'Rodney Sharp',
    status: 'professional',
    designation: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp'
  }
]

const imoveis = [
  {
    titulo: "Localidade nos bancarios",
    tipoImovel: 2,
    bairro: "Bancarios",
    area: 100,
    numeroQuartos: 3,
    numeroBanheiros: 2,
    numeroVagasGaragem: 1,
    preco: 1600,
    fotos: null,
    usuario_id: 2
  },
  {
    id: 2,
    valor: 450000,
    tipoImovel: 'apartamento',
    bairro: 'Manaíra',
    area: 92,
    quartos: 3,
    banheiros: 2,
    vagasGaragem: 2,
  },
  {
    id: 3,
    valor: 900000,
    tipoImovel: 'casa',
    bairro: 'Jardim Luna',
    area: 150,
    quartos: 4,
    banheiros: 4,
    vagasGaragem: 4,
  },
  {
    id: 4,
    valor: 2000000,
    tipoImovel: 'cobertura',
    bairro: 'Intermares',
    area: 120,
    quartos: 3,
    banheiros: 4,
    vagasGaragem: 3,
  },
  {
    id: 5,
    valor: 350000,
    tipoImovel: 'apartamento',
    bairro: 'Bessa',
    area: 100,
    quartos: 2,
    banheiros: 3,
    vagasGaragem: 2,
  },
  {
    id: 6,
    valor: 1200000,
    tipoImovel: 'apartamento',
    bairro: 'Altiplano',
    area: 60,
    quartos: 4,
    banheiros: 5,
    vagasGaragem: 4,
  },
  {
    id: 7,
    valor: 250.000,
    tipoImovel: 'quitinete',
    bairro: 'bessa',
    area: 30,
    quartos: 1,
    banheiros: 1,
    vagasGaragem: 1,
  },
  
]

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const ImoveisTable = () => {
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
                <TableCell>{imovel.valor}</TableCell>
                <TableCell>{imovel.bairro}</TableCell>
                <TableCell>{imovel.area}</TableCell>
                <TableCell>{imovel.quartos}</TableCell>
                <TableCell>{imovel.banheiros}</TableCell>
                <TableCell>{imovel.vagasGaragem}</TableCell>
                <TableCell>
                  <ButtonStyled size="small" variant="contained" color="primary">
                    Matches
                  </ButtonStyled>
                </TableCell>
                <TableCell>
                <Grid item xs={6} spacing={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton variant="outlined" color="primary">
                      <EditIcon />
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
