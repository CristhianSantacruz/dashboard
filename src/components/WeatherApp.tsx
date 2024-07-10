import WeatherCard from './WeatherCardProps'
import { Grid } from '@mui/material';
import { WeatherCardProps } from './WeatherCardProps';

interface WeatherAppProps {
  weatherData?: WeatherCardProps[]; 
}

const WeatherApp: React.FC<WeatherAppProps> = ({ weatherData = [] }) => {
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