import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import { LocationOn } from '@mui/icons-material'; // Example icon


interface WeatherCardProps {
    city : string,
    temperature : number,
    condition : string,
    windSpeed : number,
    humidity : number,
    icon : string
}

const WeatherCard: React.FC<WeatherCardProps> = ({
    city,
    temperature,
    condition,
    windSpeed,
    humidity,
    icon
  }) => {
    return (
      <Card variant="outlined" sx={{ width: 300, margin: '10px' }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h5">{city}</Typography>
              <IconButton size="small">
                <LocationOn />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="body1">{temperature}°C</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle1">{condition}</Typography>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2">Wind: {windSpeed} km/h</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">Humidity: {humidity}%</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
  export default WeatherCard;