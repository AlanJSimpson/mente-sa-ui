import { ThemeProvider } from '@mui/material/styles';
import { Outlet, Route, Routes } from 'react-router';
import NavBar from './components/navbar/NavBar';
import DashboardPage from './pages/dashboardPage/DashboardPage';
import LoginPage from './pages/login/LoginPage';
import PacientePage from './pages/pacientes/PacientePage';
import RegisterPage from './pages/register/RegisterPage';
import SessaoPage from './pages/sessao/SessaoPage';
import { theme } from './theme';

const WithNav = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const WithoutNav = () => {
  return <Outlet />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registro' element={<RegisterPage />} />
        </Route>

        <Route element={<WithNav />}>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/pacientes' element={<PacientePage />} />
          <Route path='sessao' element={<SessaoPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
