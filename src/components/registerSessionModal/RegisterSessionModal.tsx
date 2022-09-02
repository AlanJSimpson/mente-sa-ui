import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { api } from '../../api/index';
import { ISessao } from '../../types/SessaoType';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  marginY: '5px',
};

interface IModalType {
  shouldOpen: boolean;
  type: string;
}

interface IModalProps {
  show: IModalType;
  close: Function;
  onCreatePaciente: Function;
  selectedItem: ISessao;
}

export default function RegisterSessionModal({
  show,
  close,
  onCreatePaciente,
  selectedItem,
}: IModalProps) {
  const [paciente, setPaciente] = useState('');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [temaAbordado, setTemaAbordado] = useState('');
  const [duracao, setDuracao] = useState<any>();
  const [tipoSessao, setTipoSessao] = useState('');

  useEffect(() => {
    if (show.type === 'create') {
      setPaciente('');
      setDataAgendamento('');
      setTemaAbordado('');
      setDuracao(0);
      setTipoSessao('');
    } else if (show.type === 'update') {
      setPaciente(selectedItem.paciente_sessao.nome);
      setDataAgendamento(selectedItem.data_agendamento);
      setTemaAbordado(selectedItem.tema_abordado);
      setDuracao(selectedItem.duracao);
      setTipoSessao(selectedItem.tipo_sessao);
    }
  }, [show.shouldOpen]);

  const handleChangeSelectPacient = (e: SelectChangeEvent) => {
    setPaciente(e.target.value as string);
  };

  const handleChangeSelectTypeSession = (e: SelectChangeEvent) => {
    setTipoSessao(e.target.value as string);
  };

  const handleChangeDuration = (e: any) => {
    console.log(e);
  };

  const handleSavePaciente = async () => {
    const savedPaciente = await api.post('/paciente/register', {
      nome: paciente,
      email: dataAgendamento,
      genero: temaAbordado,
      data_nascimento: duracao,
      cpf: tipoSessao,
    });

    return onCreatePaciente(savedPaciente);
  };

  const handleUpdateSessao = async () => {
    const updatedPaciente = await api.put(
      `/sessao/update/${selectedItem.id_sessao}`,
      {
        paciente_sessao: paciente,
        data_agendamento: dataAgendamento,
        tema_abordado: temaAbordado,
        duracao,
        tipo_sessao: tipoSessao,
      }
    );

    return onCreatePaciente(updatedPaciente);
  };
  return (
    <Modal
      open={show.shouldOpen}
      onClose={() => close(false)}
      aria-labelledby='modal-register-title'
      aria-describedby='modal-content'
    >
      <Box sx={style}>
        <Typography
          id='modal-register-title'
          textAlign='center'
          variant='h6'
          component='h2'
        >
          Cadastro de sessão
        </Typography>
        <Box
          component='form'
          id='modal-content'
          className='form-box'
          sx={{ mt: 2 }}
          onSubmit={(event: React.SyntheticEvent) => {
            event?.preventDefault();
            close(false);

            return show.type === 'create'
              ? handleSavePaciente()
              : handleUpdateSessao();
          }}
        >
          <FormControl fullWidth>
            <InputLabel id='select-of-pacientes'>Pacientes</InputLabel>
            <Select
              labelId='select-of-pacientes'
              id='select'
              value={paciente}
              label='Paciente'
              onChange={handleChangeSelectPacient}
              variant='standard'
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <TextField
            required
            sx={buttonStyle}
            fullWidth
            label='data'
            type='date'
            id='sessao-data-agendamento'
            value={dataAgendamento}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDataAgendamento(
                moment(event.target.value).format('yyyy-MM-DD')
              )
            }
            variant='standard'
          />

          <TextField
            required
            variant='standard'
            sx={buttonStyle}
            fullWidth
            label='Tema abordado'
            id='data-agendamento'
            value={temaAbordado}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTemaAbordado(event.target.value)
            }
          />

          <FormControl fullWidth>
            <InputLabel id='select-type-session'>Tipo de Sessão</InputLabel>
            <Select
              labelId='select-type-session'
              id='select-type-session'
              value={paciente}
              label='Tipo da sessão'
              variant='standard'
              onChange={handleChangeSelectTypeSession}
            >
              <MenuItem value={'casal'}>Casal</MenuItem>
              <MenuItem value={'individual'}>Individual</MenuItem>
              <MenuItem value={'grupo'}>Grupo</MenuItem>
            </Select>
          </FormControl>

          <Box className='form-buttons'>
            <Button
              size='large'
              variant='contained'
              color='warning'
              onClick={() => close(false)}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              size='large'
              color='success'
              variant='contained'
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
