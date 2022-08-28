import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../sidebar/SideBar';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SideBar
              elementList={[
                {
                  text: 'Dashboard',
                  icon: (
                    <>
                      <IconButton>
                        <DashboardIcon />
                      </IconButton>
                    </>
                  ),
                  path: '/',
                },
                {
                  text: 'Pacientes',
                  icon: (
                    <IconButton>
                      <PersonIcon />
                    </IconButton>
                  ),
                  path: '/pacientes',
                },
                {
                  text: 'Sessões',
                  icon: (
                    <IconButton>
                      <CalendarMonthIcon />
                    </IconButton>
                  ),
                  path: '/sessao',
                },
              ]}
            />
            <Typography variant='h5'>Mente sã</Typography>
          </Box>

          <Button onClick={handleClick}>
            <Avatar>A</Avatar>
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem
              onClick={() => {
                navigate('/login');
                handleClose();
              }}
            >
              Sair
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
