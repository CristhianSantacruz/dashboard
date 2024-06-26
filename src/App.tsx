import './App.css';
import { Grid, Typography } from '@mui/material'; 
import WeatherApp from './components/WeatherApp';
import WeatherTodayCard from './components/WeatherTodayCard';
import ControlPanel from './components/ControlPanel';
import WeatherChart from './components/WeatherChart';
import { useEffect, useState } from 'react';
import Indicator from './components/Indicator';
import BasicTable from './components/BasicTable';

interface Row {
  rangeHours: string;
  windDirection: string;
}

function App() {
  let [indicators, setIndicators] = useState([]);
  let [rowsTable, setRowsTable] = useState<Array<Row>>([]);

  useEffect(() => {
    async function fetchData() {

      let savedTextXML = localStorage.getItem("openWeatherMap")
      let expiringTime = localStorage.getItem("expiringTime")

      {/* Estampa de tiempo actual */}

      let nowTime = (new Date()).getTime();
      if(expiringTime === null || nowTime > parseInt(expiringTime)) {

        {/* Request */}

        let API_KEY = "a125c79b98b9cabf669964cf63329487"
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
        savedTextXML = await response.text();


        {/* Diferencia de tiempo */}

        let hours = 1
        let delay = hours * 3600000


        {/* En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */}

        localStorage.setItem("openWeatherMap", savedTextXML)
        localStorage.setItem("expiringTime", (nowTime + delay ).toString() )
    }
    if(savedTextXML != null){
      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      let dataToIndicators = new Array();

      let location = xml.getElementsByTagName("location")[1];

      let city = xml.getElementsByTagName("name")[0].innerHTML
      dataToIndicators.push(["Location","name",city])

      let geobaseid = location.getAttribute("geobaseid");
      dataToIndicators.push(["Location", "geobaseid", geobaseid]);

      let latitude = location.getAttribute("latitude");
      dataToIndicators.push(["Location", "Latitude", latitude]);

      let longitude = location.getAttribute("longitude");
      dataToIndicators.push(["Location", "Longitude", longitude]);

      console.log(dataToIndicators);
       
      let indicatorsElements:any = dataToIndicators.map(
        (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
      );
     
      setIndicators(indicatorsElements);  
      
      let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement:any) => {
        let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];
        let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");
        return { rangeHours, windDirection };
      });

      arrayObjects = arrayObjects.slice(0, 8);

      setRowsTable(arrayObjects);
    }}
    
    fetchData();
  }, []);

  return (
    <>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={12} lg={12}>
          <Typography color={"white"} variant="h4">
            Mostrar deba card del comoe stara el clima en 5 dias y asi mimso grafiucos aqui abajo
          </Typography>
          <WeatherApp />
        </Grid>
        <Grid item sx={{
          bgcolor: 'rgba(162, 232, 231, 0.8) ',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',      
        }} xs={12} lg={4}>
          <div style={{ textAlign: 'left', width: '100%' ,marginBottom:'10px' }}>
            <Typography color="black" variant="h6">
              Detalles del clima actual del día de hoy
            </Typography>
          </div>
          <WeatherTodayCard />
        </Grid>
        <Grid item sx={{ marginLeft: '70px', marginTop: '20px' }} xs={12} lg={4}>
          <ControlPanel />
        </Grid>
        <Grid item sx={{ marginLeft: '90px', marginTop: '20px' }} xs={12} lg={10}>
          <WeatherChart />
        </Grid>
      </Grid>
      <Grid item sx={{ margin: '4px' }} container spacing={5}>
        <Grid item xs={6} lg={2}>
          {indicators[0]}
        </Grid>
        <Grid item xs={6} lg={2}>
          {indicators[1]}
        </Grid>
        <Grid item xs={6} lg={2}>
          {indicators[2]}
        </Grid>
        <Grid item xs={6} lg={2}>
          {indicators[3]}
        </Grid>
        <Grid item xs={12} lg={8}>
          <BasicTable rows={rowsTable} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
