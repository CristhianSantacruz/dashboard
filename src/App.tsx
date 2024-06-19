
import './App.css'
//import Indicator from './components/Indicator'
import Grid from '@mui/material/Unstable_Grid2'; 
//import Summary from './components/Summary'
import BasicTable from './components/BasicTable';
function App() {
 

  return (
    <Grid container spacing={5}>
    <Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
    <Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
    <Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
    <Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
    <Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
    <Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
      {/* <Indicator title='Precipitacion' subtitle='Probabilidad' value={0.13}/> */}
    {/*<Summary/> */}
    <BasicTable />
  </Grid>
  )
}

export default App
