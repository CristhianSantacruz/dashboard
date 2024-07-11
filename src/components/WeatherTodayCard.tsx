
import { Card, CardContent, CardMedia, Typography,Box } from '@mui/material';
import React from 'react';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

export const WeatherSunnyIcon = ({ width = "800px", height = "800px" }) => (
  <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" 
      width={width} height={height} viewBox="0 0 512 512"  >
    <g>
    <path  d="M212.969,278.609c15.938-44.594,56.344-76.75,103.688-82.141c-15.469-44.016-57.375-75.5-106.656-75.5
      c-62.438,0-113.109,50.594-113.109,113.047c0,29.781,11.531,56.859,30.375,77.078c21.672-20.156,50.734-32.547,82.672-32.547
      C210.938,278.547,211.906,278.609,212.969,278.609z"/>
    <rect x="193.516" y="24.047"  width="32.938" height="63.406"/>
    <polygon  points="117.984,118.734 73.156,73.906 49.859,97.188 94.688,142.031 	"/>
    <rect y="217.563"  width="63.406" height="32.938"/>
    <path  d="M49.859,370.844l23.266,23.328l17.578-17.594c2.766-14.109,7.969-27.344,15.219-39.266l-11.266-11.266
      L49.859,370.844z"/>
    <polygon  points="370.125,97.188 346.813,73.891 302,118.734 325.281,142.031 	"/>
    <path  d="M422.578,304.344c-9.234-42.828-47.281-74.922-92.859-74.922c-46.063,0-84.438,32.75-93.156,76.25
      c-5.156-0.891-10.438-1.453-15.844-1.453c-50.75,0-91.875,41.125-91.875,91.859c0,50.75,41.125,91.875,91.875,91.875
      c43.359,0,156.75,0,199.406,0c50.75,0,91.875-41.125,91.875-91.875C512,346.156,472.188,305.641,422.578,304.344z"/>
    </g>
    </svg>
  );

export const WeatherCloudyIcon = ({ width = "800px", height = "800px" }) => (
    <svg height={height} width={width} version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512">
      <g>
        <path  d="M185.158,223.146c2.486,0,4.965,0.076,7.436,0.248c11.88-40.59,41.969-72.75,80.556-87.742
          c-17.131-26.503-46.904-44.056-80.804-44.056c-49.751,0-90.689,37.788-95.66,86.236c-6.976-2.162-14.389-3.323-22.066-3.323
          C33.411,174.51,0,207.914,0,249.122c0,41.216,33.411,74.619,74.619,74.619h0.746C80.277,267.458,127.625,223.146,185.158,223.146z"
          />
        <path  d="M434.638,265.688c-0.03,0-0.06,0.008-0.098,0.008c0.045-1.288,0.098-2.576,0.098-3.872
          c0-61.956-50.218-112.174-112.167-112.174c-58.03,0-105.77,44.07-111.578,100.572c-8.136-2.516-16.769-3.873-25.735-3.873
          c-48.064,0-87.027,38.964-87.027,87.028c0,48.063,38.963,87.027,87.027,87.027h249.48c42.723,0,77.362-34.631,77.362-77.354
          C512,300.32,477.361,265.688,434.638,265.688z"/>
      </g>
  </svg>
)

interface WatherTodayCardProps {
  city : string,
  country : string 
  averageTemperatureToday:number
  averageHumidityToday:number

}

const WeatherTodayCard  : React.FC<WatherTodayCardProps>= ({city,country,averageTemperatureToday,averageHumidityToday}) => {


  return (
    <Card sx={{ maxWidth: 200 , px:3 , py:2,borderRadius:'16px'}}>
      <CardMedia
        sx={{ height: 140, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'white', px:'1px',py:'10px' ,borderRadius:'16px' }}
      >
        {averageTemperatureToday > 25 ? <WeatherSunnyIcon/> : <WeatherCloudyIcon/>}
      </CardMedia>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2  ,marginTop:'10px'}}>
            <Typography gutterBottom variant="h5" component="div" align="center">
              {city}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" align="center">
              {country}
            </Typography>
          </Box>
        <Box sx={{display:'flex',justifyContent : 'center',gap:2,marginTop:'5px'}}>
          <DeviceThermostatOutlinedIcon sx={{color:'#276F55'}}/>
          <Typography sx={{marginLeft:'-20px'}}>{averageTemperatureToday} C</Typography>
        </Box>
        
        <Box sx={{display:'flex',justifyContent : 'center',gap:2,marginTop:'5px'}}>
         <WaterDropIcon sx={{color:'#276F55'}}/>
         <Typography>{averageHumidityToday}%</Typography> 
        </Box>
       

      </CardContent>
    </Card>
  );
};

export default WeatherTodayCard;
