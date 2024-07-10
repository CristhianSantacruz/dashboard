import './App.css';
import { Grid, Typography } from '@mui/material'; 
import WeatherApp from './components/WeatherApp';
import WeatherTodayCard from './components/WeatherTodayCard';
import ControlPanel from './components/ControlPanel';
import HumidityChart from './components/charts/HumidityChart';
import TemperatureChart from './components/charts/TemperatureChart';
import { useEffect, useState } from 'react';
import Indicator from './components/Indicator';
import BasicTable from './components/BasicTable';
import AverageIndicators from './components/AverageIndicator';
import { WeatherCardProps } from './components/WeatherCardProps';
interface Row {
  rangeHours: string;
  windDirection: string;
}

function App() {
  let [indicators, setIndicators] = useState([]);
  let [rowsTable, setRowsTable] = useState<Array<Row>>([]);
  let [city,setCity] = useState("Ecuador")
  let [country,setCountry] =  useState("")

  let [averageTemperature,setAverageTemperature] = useState(0)
  let [averageHumidity,setAverageHumidity] = useState(0)
  let [averagePrecipitation,setAveragePrecipitation] = useState(0)
  let [averageVisibility,setAverageVisibility] = useState(0)

  let [weatherDataAverageByDay,setWeatherDataAverageByDay] = useState<Array<WeatherCardProps>>([])
 

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
      
      //important data 
      
      let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement:any) => {
            let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];
            let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");
            return { rangeHours, windDirection };
      });

      const getDataFromXML = (xml: any, tagName: string, attributeName: string) => {
        return Array.from(xml.getElementsByTagName("time")).map((timeElement: any) => {
          const value = timeElement.getElementsByTagName(tagName)[0].getAttribute(attributeName);
          return { [attributeName]: value };
        });
      };

      let arrayTemperatureData = getDataFromXML(xml, "temperature", "value");
      let arrayHumidityData = getDataFromXML(xml, "humidity", "value");
      let arrayPrecipitationData = getDataFromXML(xml, "precipitation", "probability");
      let arrayVisibilityData = getDataFromXML(xml,"visibility","value")    

      
      //saco un promedio de las temperaturas para de todos los dias en todas las horas
      const temperatures = arrayTemperatureData.map(data => parseFloat(data.value));
      const sumKelvin = temperatures.reduce((total, temperature) => total + temperature, 0);
      const averageTemperatureKelvin = sumKelvin / temperatures.length;
      const averageTemperatureCelsius = Number((averageTemperatureKelvin - 273.15).toFixed(2));
      setAverageTemperature(averageTemperatureCelsius)

      //saco un promedio de la humedad de todos los dias en todas las horas
      const humiditys = arrayHumidityData.map(data=>parseFloat(data.value));
      const sumHumidity = humiditys.reduce((total,humidity)=>total+humidity,0);
      const averageHumidity = Number(sumHumidity / humiditys.length)
      setAverageHumidity(averageHumidity)

      //saco un promedio de la probabilidad de precipcitacion en esos 5 dias
      const precipitations = arrayPrecipitationData.map(data=>parseFloat(data.probability))
      const sumPrecipitation = precipitations.reduce((total,precipitation)=>total+precipitation,0);
      setAveragePrecipitation(Number(sumPrecipitation/precipitations.length))

      //saco un promedio de la visibilidad en esos 5 dias
      const visibilitys = arrayVisibilityData.map(data=>parseFloat(data.value))
      const sumVisibility = visibilitys.reduce((total,visibility)=>total+visibility,0)
      setAverageVisibility(Number(sumVisibility/visibilitys.length))
    
      arrayObjects = arrayObjects.slice(0, 8);


      const temperaturesByDay : any = [];
      for (let i = 0; i < temperatures.length; i += 8) {
        const slice = temperatures.slice(i, i + 8);
        const sumKelvin = slice.reduce((total, temp) => total + temp, 0);
        const averageKelvin = sumKelvin / slice.length;
        const averageCelsius = Number((averageKelvin - 273.15).toFixed(2)); // Convertir Kelvin a Celsius y redondear a dos decimales
        temperaturesByDay.push(averageCelsius);
      }

      console.log("Promedios de cada grupo de 8 datos en Celsius:", temperaturesByDay);


     
      function calculateAverageByGroups(dataArray:any, groupSize:number) {
        const averages = [];
        for (let i = 0; i < dataArray.length; i += groupSize) {
            const slice = dataArray.slice(i, i + groupSize);
            const sum = slice.reduce((total:number, value:number) => total + value, 0);
            const average = sum / slice.length;
            averages.push(average);
        }
        return averages;
    }

     const humidityByDay = calculateAverageByGroups(humiditys, 8);
     const visibilityByDay = calculateAverageByGroups(visibilitys, 8);
     const probabilityRainByDay = calculateAverageByGroups(precipitations,8);


      setRowsTable(arrayObjects);

      const getUniqueDatesFromXML = (xml: any) => {
        const uniqueDates = new Set<string>();
        Array.from(xml.getElementsByTagName("time")).forEach((timeElement: any) => {
          const date = timeElement.getAttribute("from").split("T")[0];
          uniqueDates.add(date);
        });
        return Array.from(uniqueDates).map((date) => ({ rangeHours: date }));
      };
      
      // Ejemplo de cómo usar la función para obtener fechas únicas
      let arrayUniqueDates = getUniqueDatesFromXML(xml);
      arrayUniqueDates.pop();
      console.log("Fechas únicas:", arrayUniqueDates)
      

      
      // arreglo vacío para almacenar los datos de cada día
      const weatherDataApp: WeatherCardProps[] = [];
      arrayUniqueDates.forEach((dateObj, index) => {
            weatherDataApp.push({
                date: dateObj.rangeHours,
                city: cityName,
                precipitation: probabilityRainByDay[index],
                windSpeed: 3.14, 
                temperature: temperaturesByDay[index],
                humidity: humidityByDay[index],
                cloud: "scattered clouds", 
                value: visibilityByDay[index]
            });
      });
      setWeatherDataAverageByDay(weatherDataApp)

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
          
            <WeatherApp  weatherData={weatherDataAverageByDay} />

            <AverageIndicators humidity={averageHumidity} precipitation={averagePrecipitation} temperature={averageTemperature} visibility={averageVisibility} /> 
       

            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12} lg={4}>
                <ControlPanel />
              </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12}>
                <TemperatureChart />
              </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12}>
                <HumidityChart />
              </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12}>
                <BasicTable rows={rowsTable} />
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
