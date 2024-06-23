
import './App.css'
import Grid from '@mui/material/Unstable_Grid2'; 
import WeatherApp from './components/WeatherApp';
import WeatherTodayCard from './components/WeatherTodayCard';
import { Typography } from '@mui/material';
function App() {
  return (
   <>
      <Grid container spacing={2}>
      <Grid  xs={12} lg={8}>
        <Typography color={"white"} variant="h4">
         Mostrar deba card del comoe stara el clima en 5 dias y asi mimso grafiucos aqui abajo </Typography>
        <WeatherApp></WeatherApp>
      </Grid>
      <Grid sx={{
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
    </Grid>
   </>
    
  )
}

export default App
