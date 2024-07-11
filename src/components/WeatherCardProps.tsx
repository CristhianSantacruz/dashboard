import { Card, CardContent, Typography, Grid, IconButton, Box,CardMedia} from '@mui/material';
import { LocationOn } from '@mui/icons-material'; // Example icon
import { WeatherCloudyIcon,WeatherSunnyIcon } from './WeatherTodayCard';

export interface WeatherCardProps {
    date : string
    city: string,
    precipitation : number
    windSpeed :number,
    temperature : number,
    humidity : number,
    cloud : string,
    value : number,
}



const WeatherCard: React.FC<WeatherCardProps> = (weatherCardPropsConfig: WeatherCardProps) => {
  return (
    <Card variant="outlined" sx={{ width: 300, margin: '5px' }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <IconButton size="small" sx={{ bgcolor: 'red', color: 'white', margin: '0px' }}>
                <LocationOn />
              </IconButton>
              <Typography variant="h6" sx={{ marginLeft: '-13px' }}>{weatherCardPropsConfig.city}</Typography>
              <Typography sx={{ marginLeft: '20px', color: 'green', fontStyle: 'italic', fontSize: '20px' }} variant="h5">{weatherCardPropsConfig.date}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body1" sx={{ color: 'green', fontStyle: 'oblique', fontSize: '20px', fontWeight: "bold", marginTop: '10px', textAlign: 'center' }}>
          {weatherCardPropsConfig.temperature}°C
        </Typography>
        <CardMedia sx={{ marginTop: '1px', marginBottom: '12px', marginRight: '-20px', marginLeft: '-20px', padding: '0px' }}>
          {weatherCardPropsConfig.temperature > 25 ? <WeatherSunnyIcon height='100px' width='100px' /> : <WeatherCloudyIcon height='100px' width='100px' />}
        </CardMedia>
        <Typography variant="h5" sx={{ marginBottom: '3px' }}>{(weatherCardPropsConfig.precipitation * 100).toFixed(0)}% ☔</Typography>
        <Grid container justifyContent="space-between" sx={{ marginTop: '5px' }}>
          <Grid item>
            <Typography variant="body2">Rafagas de Viento: {weatherCardPropsConfig.windSpeed} m/s 🍃</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Humedad: {weatherCardPropsConfig.humidity}💧</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Visibilidad: {weatherCardPropsConfig.value}☁️</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
  
  export default WeatherCard;