import './App.css';
import { Grid, Typography ,Paper,Button} from '@mui/material'; 
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
  let [city,setCity] = useState("Ecuador")
  let [country,setCountry] =  useState("")
  // Estado para almacenar la URL de la imagen de fondo actual


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
      let cityName = xml.getElementsByTagName("name")[0].innerHTML
      setCity(cityName)
      let countryName = xml.getElementsByTagName("country")[0].innerHTML
      setCountry(countryName)
      let geobaseid = location.getAttribute("geobaseid");
      let latitude = location.getAttribute("latitude");
      let longitude = location.getAttribute("longitude");
      
      
      dataToIndicators.push(["Location","name",cityName])
      dataToIndicators.push(["Location", "geobaseid", geobaseid]);
      dataToIndicators.push(["Location", "Latitude", latitude]);
      dataToIndicators.push(["Location", "Longitude", longitude]);  
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
      <Grid container spacing={2} columns={16} sx={{gap:'2'} }>
        <Grid item xs={12} lg={12} >
            <Typography color={"white"} variant="h4" align="center">
              Clima en la ciudad de {city}
            </Typography>
          
            <WeatherApp />

            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12} lg={4}>
                <ControlPanel />
              </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12}>
                <BasicTable rows={rowsTable} />
              </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12}>
                <WeatherChart />
              </Grid>
            </Grid>
        </Grid>


        <Grid item sx={{
          boxShadow: 1,
          borderRadius: 2,
          px: 5,
          py: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
           
        }} xs={12} lg={4}>
          <WeatherTodayCard city={city} country={country} /> 
          
          {/* Grid para los indicadores */}
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6} lg={16}>
              {indicators[0]}
            </Grid>
            <Grid item xs={6} lg={16}>
              {indicators[1]}
            </Grid>
            <Grid item xs={6}  lg={16}>
              {indicators[2]}
            </Grid>
            <Grid item xs={6}  lg={16}>
              {indicators[3]}
            </Grid>
          </Grid>  
        </Grid>  
      </Grid>
    </>
  );
}

export default App;
