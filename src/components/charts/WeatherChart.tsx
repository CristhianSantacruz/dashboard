import { Chart } from "react-google-charts";
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { getDataFromXML } from "../../App";

interface WeatherChartProps {
    selectedVariable: number; // Definir selectedVariable como número
}

export default function WeatherChart({ selectedVariable }: WeatherChartProps) {
    const [chartData, setChartData] = useState<any[]>([]);
    let temperatureData: any[] = [];
    let precipitationData: any[] = [];
    let humidityData: any[] = [];
    let pressureData : any[] = [];
    

    useEffect(() => {
        async function fetchData() {
            try {
                let API_KEY = "a125c79b98b9cabf669964cf63329487"
                let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
                let savedTextXML = await response.text();
                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");
                let dataTable: any[] = [];
                let time = xml.getElementsByTagName('time');
                let temperatures  = getDataFromXML(xml, "temperature", "value");
                let precipitacions = getDataFromXML(xml,"precipitation","probability")
                let humiditys = getDataFromXML(xml,"humidity","value")
                let pressures = getDataFromXML(xml,"pressure","value")
                console.log(precipitacions)
                 for(let i = 0 ; i< time.length;i++){   
                    const timeFrom = time[i].getAttribute("from")!!
                    temperatureData.push([new Date(timeFrom),parseFloat((parseFloat(temperatures[i].value) - 273.15).toFixed(2))])   
                    precipitationData.push([new Date(timeFrom),parseFloat(precipitacions[i].probability)])
                    humidityData.push([new Date(timeFrom),Number(humiditys[i].value)])
                    pressureData.push([new Date(timeFrom),Number(pressures[i].value)])
                    dataTable.push([new Date(timeFrom),parseFloat((parseFloat(temperatures[i].value) - 273.15).toFixed(2)),parseFloat(precipitacions[i].probability),Number(humiditys[i].value),Number(pressures[i].value)])
                 } 
                
                // Agregar encabezados al inicio de los datos
                switch(selectedVariable){
                    case -1:                      
                        setChartData([['Fecha-Hora', 'Temperatura (°C)', 'Precipitacion (%)','Humedad (%)', 'Presion (hPa)']].concat(dataTable));
                        break;
                    case 0:
                        setChartData([['Fecha-Hora', 'Temperatura (°C)']].concat(temperatureData));
                        break;
                    case 1:
                        setChartData([['Fecha-Hora', 'Precipitacion Probabilidad %']].concat(precipitationData));
                        break;
                    case 2:
                        setChartData([['Fecha-Hora', 'Humedad %']].concat( humidityData));
                        break;
                    case 3:
                        setChartData([['Fecha-Hora', 'Presion hPa']].concat(pressureData));
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('Error al cargar datos');
            }
        }
        fetchData();
    }, [selectedVariable]);

    // Configuración de opciones para el gráfico
    let options = {
        title: "Variable Meteorologicas (Temperatura,Precipitacion,Humedad,Visibilidad) vs Hora",
        curveType: "function",
        legend: { position: "right" },
        backgroundColor: '#f4f4f4',
        colors: ['#276F55', '#FF8C33', '#3357FF', '#F033FF'],
        hAxis: {
            format: 'dd/MM/yyyy HH:mm',
        },
        chartArea: {
            left: 80,
            top: 50,
            width: '70%',
            height: '70%'
          },
          pointSize: 5,
          lineWidth: 2,
          tooltip: { textStyle: { color: '#276F55' }, showColorCode: true },
        vAxis: {
            title: 'Propiedades del Clima',
            titleTextStyle: { color: '#276F55' },
            textStyle: { color: '#276F55' }
          },  
    };

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Chart
                chartType="LineChart"
                data={chartData}
                width="100%"
                height="400px"
                options={options}
            />
        </Paper>
    );
}
