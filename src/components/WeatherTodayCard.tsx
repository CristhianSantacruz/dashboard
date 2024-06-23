
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';


const WeatherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="300px" height="200px" color='aqua' viewBox="0 0 24 24">
      <path fill="currentColor" d="M13.002 7.009c3.168 0 4.966 2.097 5.227 4.63h.08a3.687 3.687 0 0 1 3.692 3.683a3.687 3.687 0 0 1-3.692 3.682H7.694a3.687 3.687 0 0 1-3.692-3.682a3.687 3.687 0 0 1 3.692-3.683h.08c.263-2.55 2.06-4.63 5.228-4.63M10 4c1.617 0 3.05.815 3.9 2.062a8 8 0 0 0-.898-.053c-2.994 0-5.171 1.677-5.937 4.213l-.068.24l-.058.238l-.206.039a4.68 4.68 0 0 0-3.449 3.045a3.282 3.282 0 0 1 1.812-5.881l.257-.006A4.72 4.72 0 0 1 10 4" />
    </svg>
  );

const WeatherTodayCard = () => {
  // Ejemplo de datos del clima de hoy
  const city = 'Ciudad Ejemplo';
  const date = '22 de junio de 2024';
  const temperature = 25;
  const condition = 'Soleado';
  const isWarm = temperature >= 20; // Ejemplo simple para determinar calor o frío

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="div"
        sx={{ height: 140, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'lightgray' }}
      >
        <WeatherIcon/>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {city}
        </Typography>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="body2">{date}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color={isWarm ? 'primary' : 'secondary'}>
              {temperature}°C ({isWarm ? 'Cálido' : 'Frío'})
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center">
          {condition}
        </Typography>
        {/* Aquí puedes agregar otras propiedades del clima como humedad, velocidad del viento, etc. */}
      </CardContent>
    </Card>
  );
};

export default WeatherTodayCard;
