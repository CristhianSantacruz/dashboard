
import { Card, CardContent, CardMedia, Typography,Box } from '@mui/material';
import React from 'react';


const WeatherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="300px" height="200px" color='black' viewBox="0 0 24 24">
      <path fill="currentColor" d="M13.002 7.009c3.168 0 4.966 2.097 5.227 4.63h.08a3.687 3.687 0 0 1 3.692 3.683a3.687 3.687 0 0 1-3.692 3.682H7.694a3.687 3.687 0 0 1-3.692-3.682a3.687 3.687 0 0 1 3.692-3.683h.08c.263-2.55 2.06-4.63 5.228-4.63M10 4c1.617 0 3.05.815 3.9 2.062a8 8 0 0 0-.898-.053c-2.994 0-5.171 1.677-5.937 4.213l-.068.24l-.058.238l-.206.039a4.68 4.68 0 0 0-3.449 3.045a3.282 3.282 0 0 1 1.812-5.881l.257-.006A4.72 4.72 0 0 1 10 4" />
    </svg>
  );

interface WatherTodayCardProps {
  city : string,
  country : string 

}

const WeatherTodayCard  : React.FC<WatherTodayCardProps>= ({city,country}) => {


  return (
    <Card sx={{ maxWidth: 200 , px:3 , py:2,borderRadius:'16px'}}>
      <CardMedia
        sx={{ height: 140, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'white', px:'1px',py:'10px' ,borderRadius:'16px' }}
      >
        <WeatherIcon/>
      </CardMedia>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2  ,marginTop:'20px'}}>
            <Typography gutterBottom variant="h5" component="div" align="center">
              {city}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" align="center">
              {country}
            </Typography>
          </Box>
          {/* Aquí puedes agregar otras propiedades del clima como humedad, velocidad del viento, etc. */}
      </CardContent>
    </Card>
  );
};

export default WeatherTodayCard;
