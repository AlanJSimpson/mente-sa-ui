import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { api } from '../../api/index';
import DialogConfirmation from '../../components/dialog-confirmation/DialogConfirmation';
import RegisterPacienteModal from '../../components/registerPacienteModal/RegisterPacienteModal';
import { IPacientes } from '../../types/PacienteType';
import './pacientePage.css';

export default function PacientePage(): JSX.Element {
  const [pacientes, setPacientes] = useState<IPacientes[]>([]);
  const [isFetched, setIsFetched] = useState(true);
  const [openModal, setOpenModal] = useState({ shouldOpen: false, type: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [selectedItem, setSelectedItem] = useState<IPacientes>({
    nome: '',
    cpf: '',
    data_nascimento: '',
    email: '',
    genero: '',
  });

  const getPacientes = useCallback(async () => {
    const fetchedPacientes: AxiosResponse = await api.get('/paciente/findall');
    setPacientes(fetchedPacientes.data);
  }, []);

  useEffect(() => {
    if (isFetched) getPacientes().then(() => setIsFetched(false));
  }, [isFetched, getPacientes]);

  const handleClose = (shouldOpen: boolean) => {
    setOpenModal({ ...openModal, shouldOpen });
  };

  const handleCloseDialog = (shouldOpen: boolean, fetch: boolean = false) => {
    setOpenDialog(shouldOpen);
    setIsFetched(fetch);
  };

  const fetcheAfterSaveOrUpdatePaciente = () => {
    setIsFetched(true);
  };

  const handleFilterPaciente = async (e: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
    const pacientesFiltered: AxiosResponse = await api.get(
      `/paciente/?name=${e.target.value}`
    );

    setPacientes(pacientesFiltered.data);
  };

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
          value={filterInput}
          onInput={handleFilterPaciente}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={() => setOpenModal({ shouldOpen: true, type: 'create' })}
          startIcon={<AddCircleIcon />}
          variant='contained'
        >
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
              <TableCell>Email</TableCell>
              <TableCell>Gênero</TableCell>
              <TableCell>Data de nascimento</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell align='right'>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientes.map((paciente) => {
              return (
                <TableRow key={paciente.id_paciente}>
                  <TableCell>{paciente.nome}</TableCell>
                  <TableCell>{paciente.email}</TableCell>
                  <TableCell>{paciente.genero}</TableCell>
                  <TableCell>{paciente.data_nascimento.toString()}</TableCell>
                  <TableCell>{paciente.cpf}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSelectedItem(paciente);
                        setOpenModal({ shouldOpen: true, type: 'update' });
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setOpenDialog(true);
                        setSelectedItem(paciente);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <RegisterPacienteModal
        show={openModal}
        close={handleClose}
        onCreatePaciente={fetcheAfterSaveOrUpdatePaciente}
        selectedItem={selectedItem}
      />

      <DialogConfirmation
        dialogTitle='Tem certeza de que deseja excluir esse paciente?'
        open={openDialog}
        close={handleCloseDialog}
        selectedItem={selectedItem}
      />
    </Container>
  );
}
