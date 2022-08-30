import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6FD08C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#093A3E',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFCB77',
      contrastText: '#fff',
    },
    info: {
      main: '#759AAB',
    },
    error: {
      main: '#EF3054',
    },
  },
});
