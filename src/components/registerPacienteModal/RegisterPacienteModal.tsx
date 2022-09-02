import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { api } from '../../api/index';
import { IPacientes } from '../../types/PacienteType';
import './RegisterPacienteModal.css';

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
  selectedItem: IPacientes;
}

export default function RegisterPacienteModal({
  show,
  close,
  onCreatePaciente,
  selectedItem,
}: IModalProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [genero, setGenero] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');

  useEffect(() => {
    if (show.type === 'create') {
      setNome('');
      setEmail('');
      setGenero('');
      setDataNascimento('');
      setCpf('');
    } else if (show.type === 'update') {
      setNome(selectedItem.nome);
      setEmail(selectedItem.email);
      setGenero(selectedItem.genero);
      setDataNascimento(selectedItem.data_nascimento);
      setCpf(selectedItem.cpf);
    }
  }, [show.shouldOpen]);

  const handleSavePaciente = async () => {
    const savedPaciente = await api.post('/paciente/register', {
      nome,
      email,
      genero,
      data_nascimento: dataNascimento,
      cpf,
    });

    return onCreatePaciente(savedPaciente);
  };

  const handleUpdatePaciente = async () => {
    const updatedPaciente = await api.put(
      `/paciente/update/${selectedItem.id_paciente}`,
      {
        nome,
        email,
        genero,
        data_nascimento: dataNascimento,
        cpf,
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
          Cadastro de paciente
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
              : handleUpdatePaciente();
          }}
        >
          <TextField
            required
            sx={buttonStyle}
            fullWidth
            label='Nome'
            id='paciente-name'
            value={nome}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNome(event.target.value)
            }
            variant='standard'
          />

          <TextField
            required
            variant='standard'
            sx={buttonStyle}
            fullWidth
            label='Email'
            id='paciente-email'
            value={email}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />

          <TextField
            required
            variant='standard'
            sx={buttonStyle}
            fullWidth
            label='Genero'
            id='paciente-genero'
            value={genero}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setGenero(event.target.value)
            }
          />

          <TextField
            required
            variant='standard'
            sx={buttonStyle}
            fullWidth
            id='paciente-data-nascimento'
            type='date'
            value={dataNascimento}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDataNascimento(moment(event.target.value).format('yyyy-MM-DD'))
            }
          />

          <TextField
            required
            variant='standard'
            sx={buttonStyle}
            fullWidth
            label='CPF'
            id='paciente-cpf'
            value={cpf}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              setCpf(event.target.value)
            }
          />

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
