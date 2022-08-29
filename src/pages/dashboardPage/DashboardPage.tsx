import { Box, Card, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import './dashboardPage.css';

export default function DashboardPage() {
  return (
    <Container>
      <Typography sx={{ marginY: '2rem' }} component='h2' variant='h3'>
        DashBoard
      </Typography>

      <Box className='card-box'>
        {[
          { title: 'Sessões agendadas (dia)', value: 5 },
          { title: 'Sessões agendadas (mês)', value: 15 },
          { title: 'Sessões canceladas', value: 1 },
          { title: 'Total de pacientes cadastrados', value: 546 },
          { title: 'Total de sessões (individuais)', value: 10 },
        ].map((card, index) => {
          return (
            <Card
              key={index}
              sx={{ width: 200, marginX: 5, marginBottom: '2rem' }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  {card.title}
                </Typography>
                <Typography textAlign='center' variant='h5' component='div'>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}
