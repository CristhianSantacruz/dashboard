
import { weatherData } from '../data/watherData'
import WeatherCard from './WeatherCardProps'
import { Grid, Typography } from '@mui/material';

const WeatherApp: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <Typography color={'white'} variant="h3" align="center" gutterBottom>
        Weather App
      </Typography>
      <Grid container justifyContent="center" spacing={3}>
        {weatherData.map((data) => (
          <Grid item key={data.city}>
            <WeatherCard {...data} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WeatherApp;