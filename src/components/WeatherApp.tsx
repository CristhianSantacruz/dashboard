
import { weatherData } from '../data/watherData'
import WeatherCard from './WeatherCardProps'
import { Grid } from '@mui/material';

const WeatherApp: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <Grid container justifyContent="center" spacing={3}>
        {weatherData.map((data, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
            <WeatherCard {...data} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WeatherApp;