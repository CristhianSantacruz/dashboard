
import './App.css'
import {Grid} from '@mui/material'; 
import WeatherApp from './components/WeatherApp';
import WeatherTodayCard from './components/WeatherTodayCard';
import ControlPanel from './components/ControlPanel';
import WeatherChart from './components/WeatherChart';
import { Typography } from '@mui/material';
function App() {
  return (
   <>
      <Grid container spacing={2} columns={16}>
      <Grid item xs={12} lg={12}>
        <Typography color={"white"} variant="h4">
         Mostrar deba card del comoe stara el clima en 5 dias y asi mimso grafiucos aqui abajo </Typography>
        <WeatherApp></WeatherApp>
      </Grid>
      <Grid item sx={{
        bgcolor: 'rgba(162, 232, 231, 0.8) ',
        boxShadow : 1,
        borderRadius : 2,
        p: 2,
        display: 'flex',
          flexDirection : 'column',
          justifyContent: 'center',
          alignItems: 'center',      
      }}  xs={12} lg={4}>
        <div style={{ textAlign: 'left', width: '100%' ,marginBottom:'10px' }}>
            <Typography color="black" variant="h6">
              Detalles del clima actual del día de hoy
            </Typography>
        </div>
        
          <WeatherTodayCard/>
          </Grid>
          <Grid item sx={{
              marginLeft: '70px',
              marginTop:'20px'
          }} xs={12} lg={4}>
            <ControlPanel />
          </Grid>
          <Grid item sx={{marginLeft:'90px', marginTop:'20px'}} xs={12} lg={10}>
             <WeatherChart></WeatherChart>
          </Grid>
        
    </Grid>
   </>
    
  )
}

export default App
