
import './App.css'
import Indicator from './components/Indicator'
import Grid from '@mui/material/Unstable_Grid2'; 
import Summary from './components/Summary'
import BasicTable from './components/BasicTable';
import NavBar from './components/NavBar'
function App() {
  return (
   <>
    <NavBar></NavBar>
    <Grid container spacing={5}>
      <Grid xs={12} sm={4} md={3} lg={2}>

        <Grid xs={6} sm={4} md={3} lg={2}><Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/></Grid>
        <Grid xs={6} sm={4} md={3} lg={2}><Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/></Grid>
        <Grid xs={6} sm={4} md={3} lg={2}><Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/></Grid>

      </Grid>
    <Grid xs={6} sm={4} md={3} lg={2}><Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/></Grid>
    <Grid xs={6} sm={4} md={3} lg={2}><Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/></Grid>
    <Grid xs={12} sm={4} md={3} lg={2}><Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/></Grid>
    <Grid xs={6} sm={4} md={6} lg={2}><Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/></Grid>
    <Grid xs={6} sm={4} md={6} lg={2}><Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/></Grid>
    <Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/>
    <Summary/> 
    <BasicTable/> 
     <NavBar></NavBar>
  </Grid>
   </>
    
  )
}

export default App
