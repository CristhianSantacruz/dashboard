import './App.css';
import { Grid, Typography } from '@mui/material'; 
import WeatherApp from './components/WeatherApp';
import WeatherTodayCard from './components/WeatherTodayCard';
import ControlPanel from './components/ControlPanel';
import WeatherChart from './components/charts/WeatherChart';
import { useEffect, useState } from 'react';
import Indicator from './components/Indicator';
import BasicTable from './components/BasicTable';
import AverageIndicators from './components/AverageIndicator';
import { WeatherCardProps } from './components/WeatherCardProps';
import { Row } from './components/BasicTable';


export const getUniqueDatesandCountTimesFromXML = (xml: any) => {
  const dateCountMap: { [date: string]: number } = {};

  Array.from(xml.getElementsByTagName("time")).forEach((timeElement: any) => {
    const date = timeElement.getAttribute("from").split("T")[0];
    if (date in dateCountMap) {
      dateCountMap[date]++;
    } else {
      dateCountMap[date] = 1;
    }
  });

  return Object.keys(dateCountMap).map((date) => ({
    date: date,
    count: dateCountMap[date],
  }));
};



export function calculateAverageTemperatureByGroups(dataArray:any, counts:number[]) {
  const averages:number[] = [];
  let currentIndex = 0;

  counts.forEach(count => {
    const slice = dataArray.slice(currentIndex, currentIndex + count);
    const sumKelvin = slice.reduce((total:number, temp:number) => total + temp, 0);
    const averageKelvin = sumKelvin / slice.length;
    const averageCelsius = Number((averageKelvin - 273.15).toFixed(2)); // Convertir Kelvin a Celsius y redondear a dos decimales
    averages.push(averageCelsius);
    currentIndex += count;
  });

  return averages;
}

export function calculateAverageByGroups(dataArray:any, counts:number[]) {
  const averages : number[] = [];
  let currentIndex = 0;

  counts.forEach(count  => {
    const slice = dataArray.slice(currentIndex, currentIndex + count);
    const sum = slice.reduce((total:number, value:number) => total + value, 0);
    const average = (sum / slice.length).toFixed(2);
    averages.push(Number(average));
    currentIndex += count;
  });

  return averages;
}

export const getDataFromXML = (xml: any, tagName: string, attributeName: string) => {
  return Array.from(xml.getElementsByTagName("time")).map((timeElement: any) => {
    const value = timeElement.getElementsByTagName(tagName)[0].getAttribute(attributeName);
    return { [attributeName]: value };
  });
};

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
  let [averageTemperatureToday,setAverageTemperatureToday] = useState(0)
  let [averageHumidityToday,setAverageHumidityToday] = useState(0)

  let [todayDate,setTodayDate] = useState("")
  let [selectVariable,setSelectedVariable] = useState(-1)
  
  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    const dayName = daysOfWeek[date.getUTCDay()];
    return `${dayName} ${dateString}`;
  };
  


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
      let timeZone = xml.getElementsByTagName("timezone")[0].innerHTML
      
      
      dataToIndicators.push(["Ubicación","name",cityName])
      dataToIndicators.push(["Ubicación", "geobaseid", geobaseid]);
      dataToIndicators.push(["Ubicación", "Latitud", latitude]);
      dataToIndicators.push(["Ubicación", "Longitud", longitude]);
      dataToIndicators.push(["Ubicación","TimeZone",timeZone])  
      let indicatorsElements:any = dataToIndicators.map(
        (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
      );
     
      setIndicators(indicatorsElements); 
      
      //contar cuantos datos hay para el dia de hoy por ejemplo si es 12 y hay solo datos para 3 diferentes horas seria 3 datos para 12


      //important data 
      
      let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement:any) => {
            let rangeHours = timeElement.getAttribute("from").split("T")[1] + " - " + timeElement.getAttribute("to").split("T")[1];
            let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");
            let windSpeed = timeElement.getElementsByTagName("windSpeed")[0].getAttribute("mps") + " " + timeElement.getElementsByTagName("windSpeed")[0].getAttribute("unit")
            let windGust = timeElement.getElementsByTagName("windGust")[0].getAttribute("gust") + " " +  timeElement.getElementsByTagName("windGust")[0].getAttribute("unit")
            let clouds = timeElement.getElementsByTagName("clouds")[0].getAttribute("value") + " " + timeElement.getElementsByTagName("clouds")[0].getAttribute("all") + "" +   timeElement.getElementsByTagName("clouds")[0].getAttribute("unit")
            let visibility = timeElement.getElementsByTagName("visibility")[0].getAttribute("value")
            return { rangeHours, windDirection,windSpeed,windGust,clouds,visibility };
      });

      

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
    

      // Supongamos que ya tienes el XML y has obtenido los conteos por día
      const uniqueDatesAndCounts = getUniqueDatesandCountTimesFromXML(xml);
      const counts = uniqueDatesAndCounts.map(entry => entry.count)
      const dates  = uniqueDatesAndCounts.map(entry =>entry.date)

      // Luego puedes calcular los promedios por día
     const humidityByDay = calculateAverageByGroups(humiditys, counts);
      const visibilityByDay = calculateAverageByGroups(visibilitys, counts);
      const probabilityRainByDay = calculateAverageByGroups(precipitations, counts);
      const temperaturesByDay = calculateAverageTemperatureByGroups(temperatures, counts);
      
      arrayObjects = arrayObjects.slice(0, getUniqueDatesandCountTimesFromXML(xml)[0].count);

      setAverageHumidityToday(humidityByDay[0])
      setAverageTemperatureToday(temperaturesByDay[0])
      setRowsTable(arrayObjects);
      setRowsTable(arrayObjects)
      setTodayDate(formatDate(getUniqueDatesandCountTimesFromXML(xml)[0].date))
    
      // arreglo vacío para almacenar los datos de cada día
      const weatherDataApp: WeatherCardProps[] = [];
       dates.forEach((dateObj, index) => {
            weatherDataApp.push({
                date: formatDate(dateObj),
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

            <section className="wrapper">
              <div className="top">Clima en la ciudad de {city}</div>
              <div className="bottom" aria-hidden="true">Clima en la ciudad de {city}</div>
            </section>
     
            <WeatherApp  weatherData={weatherDataAverageByDay} />

            <AverageIndicators humidity={averageHumidity} precipitation={averagePrecipitation} temperature={averageTemperature} visibility={averageVisibility} /> 
            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12}>
              <WeatherChart selectedVariable={selectVariable} />
              </Grid>
            </Grid>

           {/*<Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12}>
                <HumidityChart />
              </Grid>
            </Grid> */}

            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12}>
                <Typography sx={{marginTop:'5px', color:'white',fontSize:'40px',textAlign:'center',fontWeight:'bold', textShadow: '2px 2px 4px #276F55' }}>☁️ Como estara el cielo el dia de hoy ⛅</Typography>

                <Typography sx={{marginTop:'5px', color:'white',fontSize:'40px',textAlign:'center',fontWeight:'bold', textShadow: '2px 2px 4px #276F55' }}>
                  {todayDate}
                </Typography>
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
          <WeatherTodayCard city={city} country={country} averageTemperatureToday={ averageTemperatureToday} averageHumidityToday={averageHumidityToday} day={todayDate}/> 
          
          {/* Grid para los indicadores */}
          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item xs={6} lg={16}>
              {indicators[4]}
            </Grid>
            <Grid item xs={6}  lg={16}>
              {indicators[1]}
            </Grid>
            <Grid item xs={6}  lg={16}>
              {indicators[2]}
            </Grid>
            <Grid item xs={6} lg={16}>
              {indicators[3]}
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
              <Grid item xs={12} lg={16}>
                <ControlPanel setSelectedVariable={setSelectedVariable}/>
              </Grid>
          </Grid>  
        </Grid>  
      </Grid>
    </>
  );
}

export default App;
