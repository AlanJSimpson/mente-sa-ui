import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './pacientePage.css';

export default function PacientePage() {
  return (
    <Container>
      <Box className='paciente-section'>
        <Typography component='h2' variant='h4'>
          Meus Pacientes
        </Typography>
        <TextField
          sx={{ width: '50%' }}
          variant='standard'
          placeholder='Pesquisar'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button startIcon={<AddCircleIcon />} variant='contained'>
          Novo Paciente
        </Button>
      </Box>

      <TableContainer sx={{ marginTop: '2rem' }} component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size='small'
          aria-label='Tabela de pacientes'
        >
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gênero</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Município</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
