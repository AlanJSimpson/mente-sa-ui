import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { api } from '../../api';
import { ISessao } from '../../types/SessaoType';
import RegisterSessionModal from './../../components/registerSessionModal/RegisterSessionModal';

export default function SessaoPage() {
  const [sessoes, setSessoes] = useState<ISessao[]>([]);
  const [filterInput, setFilterInput] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [openModal, setOpenModal] = useState({ shouldOpen: false, type: '' });
  const [selectedItem, setSelectedItem] = useState<ISessao>({
    data_agendamento: '',
    status: '',
    tema_abordado: '',
    tipo_de_agendamento: '',
    duracao: 0,
    tipo_sessao: '',
    paciente_sessao: {
      nome: '',
      cpf: '',
      data_nascimento: '',
      email: '',
      genero: '',
    },
  });

  const getAllSessions = useCallback(async () => {
    const fetchedSessions: AxiosResponse = await api.get('/sessao/findall');
    setSessoes(fetchedSessions.data);
  }, []);

  useEffect(() => {
    if (isFetched) getAllSessions().then(() => setIsFetched(false));
  }, [isFetched, getAllSessions]);

  const handleFilterPaciente = async (e: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
    // const pacientesFiltered: AxiosResponse = await api.get(
    //   `/paciente/?name=${e.target.value}`
    // );

    // setPacientes(pacientesFiltered.data);
  };

  const handleCloseModal = (shouldOpen: boolean) => {
    setOpenModal({ ...openModal, shouldOpen });
  };

  const fetcheAfterSaveOrUpdateSessao = () => {
    setIsFetched(true);
  };

  return (
    <Container>
      <Box className='paciente-section'>
        <Typography component='h2' variant='h4'>
          Minhas sessões
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
          Nova Sessão
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
              <TableCell>Paciente</TableCell>
              <TableCell>Data de Agendamento</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Tema abordado</TableCell>
              <TableCell>Duracao</TableCell>
              <TableCell>Tipo da Sessão</TableCell>
              <TableCell align='right'>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessoes.map((sessao) => {
              return (
                <TableRow key={sessao.id_sessao}>
                  <TableCell>{sessao.paciente_sessao.nome}</TableCell>
                  <TableCell>{sessao.data_agendamento}</TableCell>
                  <TableCell>{sessao.status}</TableCell>
                  <TableCell>{sessao.duracao}</TableCell>
                  <TableCell>{sessao.tipo_sessao}</TableCell>
                  <TableCell>
                    <IconButton
                    // onClick={() => {
                    //   setSelectedItem(sessao);
                    //   setOpenModal({ shouldOpen: true, type: 'update' });
                    // }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        // setOpenDialog(true);
                        // setSelectedItem(sessao);
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

      <RegisterSessionModal
        show={openModal}
        close={handleCloseModal}
        onCreatePaciente={fetcheAfterSaveOrUpdateSessao}
        selectedItem={selectedItem}
      />
    </Container>
  );
}
