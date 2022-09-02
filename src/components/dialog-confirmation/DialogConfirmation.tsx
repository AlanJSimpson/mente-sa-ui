import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { api } from '../../api';
import { IPacientes } from '../../types/PacienteType';

interface IDialogConfirmationProps {
  open: boolean;
  close: Function;
  dialogTitle: string;
  selectedItem: IPacientes;
}

export default function DialogConfirmation({
  open,
  close,
  dialogTitle,
  selectedItem,
}: IDialogConfirmationProps) {
  const handleDeletePaciente = async () => {
    await api.delete(`/paciente/delete/${selectedItem.id_paciente}`);

    close(false, true);
  };

  return (
    <Dialog
      open={open}
      onClose={() => close(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{padding: '2rem'}}
    >
      <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          color='warning'
          variant='contained'
          onClick={() => close(false)}
        >
          cancelar
        </Button>
        <Button
          variant='contained'
          onClick={handleDeletePaciente}
          autoFocus
          color='success'
        >
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
