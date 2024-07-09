import { Card, CardContent, Typography, Grid, IconButton, Box,CardMedia, colors } from '@mui/material';
import { LocationOn } from '@mui/icons-material'; // Example icon


interface WeatherCardProps {
    date : string
    city: string,
    precipitation : number
    windSpeed :number,
    temperature : number,
    humidity : number,
    cloud : string,
    value : number,
}


const WeatherIconSun = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="300px" height="100px" color='black' viewBox="0 0 24 24">
    <path fill="currentColor" d="M13.002 7.009c3.168 0 4.966 2.097 5.227 4.63h.08a3.687 3.687 0 0 1 3.692 3.683a3.687 3.687 0 0 1-3.692 3.682H7.694a3.687 3.687 0 0 1-3.692-3.682a3.687 3.687 0 0 1 3.692-3.683h.08c.263-2.55 2.06-4.63 5.228-4.63M10 4c1.617 0 3.05.815 3.9 2.062a8 8 0 0 0-.898-.053c-2.994 0-5.171 1.677-5.937 4.213l-.068.24l-.058.238l-.206.039a4.68 4.68 0 0 0-3.449 3.045a3.282 3.282 0 0 1 1.812-5.881l.257-.006A4.72 4.72 0 0 1 10 4" />
  </svg>
);

const WeatherCard: React.FC<WeatherCardProps> = (weatherCardPropsConfig : WeatherCardProps) => {
    return (
      <Card variant="outlined" sx={{ width: 300, margin: '5px' }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:2}}>
                <IconButton size="small" sx={{bgcolor:'red',color:'white', margin:'0px'}}>
                    <LocationOn />
                </IconButton>
                <Typography variant="h6" sx={{marginLeft:'-13px'}}>{weatherCardPropsConfig.city}</Typography>
                <Typography sx={{marginLeft:'20px',color:'green',fontStyle:'italic',fontSize:'20px'}} variant="h5">{weatherCardPropsConfig.date}</Typography>
            </Box>
            </Grid>
            
          </Grid>
          <Typography variant="subtitle1" sx={{fontStyle:'italic',marginTop:'-7px'}}>{weatherCardPropsConfig.cloud}</Typography>
         
           <CardMedia sx={{ marginTop: '2px', marginRight: '-20px', marginLeft: '-20px', padding: '0px' }}>
                <WeatherIconSun />
          </CardMedia>
           <Typography variant="body1" sx={{ color: 'green', fontStyle: 'oblique', fontSize: '20px', fontWeight: "bold", marginTop: '-25px', marginLeft: '10px' }}>{weatherCardPropsConfig.temperature}°C</Typography>
          
           <Typography variant="h5" sx={{ marginBottom: '3px' }}>{(weatherCardPropsConfig.precipitation * 100).toFixed(0)}% ☔</Typography>
      
          <Grid container justifyContent="space-between">
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