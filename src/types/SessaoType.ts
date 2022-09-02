import { IPacientes } from './PacienteType';

export interface ISessao {
  id_sessao?: number;
  data_agendamento: string;
  status: string;
  tema_abordado: string;
  tipo_de_agendamento: string;
  duracao: number;
  tipo_sessao: string;
  paciente_sessao: IPacientes;
}
