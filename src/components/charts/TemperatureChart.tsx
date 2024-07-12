import { Chart } from "react-google-charts";
import { Paper } from "@mui/material";


export default function TemperatureChart() {
  let options = {
    title: "Temperatura por Dia",
    curveType: "function",
    legend: { position: "right" },
    backgroundColor: '#f4f4f4', // Fondo del gráfico
    colors: ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF8C33'], // Colores de las líneas
    hAxis: {
      title: 'Hora',
      titleTextStyle: { color: '#333' },
      textStyle: { color: '#333' }
    },
    vAxis: {
      title: 'Temperatura (°C)',
      titleTextStyle: { color: '#333' },
      textStyle: { color: '#333' }
    },
    chartArea: {
      left: 50,
      top: 50,
      width: '80%',
      height: '70%'
    },
    pointSize: 5,
    lineWidth: 2,
    tooltip: { textStyle: { color: '#444444' }, showColorCode: true },
  };

  const dataTemperatura = [
    ["Hora", "2027-07-09", "2027-07-10", "2027-07-11", "2027-07-12", "2027-07-13"],
    ["03:00", 20, 22, 23, 24, 25],
    ["06:00", 21, 23, 24, 25, 26],
    ["09:00", 22, 24, 25, 26, 27],
    ["12:00", 23, 25, 26, 27, 28],
    ["15:00", 24, 26, 27, 28, 29],
    ["18:00", 25, 27, 28, 29, 30],
    ["21:00", 26, 28, 29, 30, 31],
  ];

  return (
    <>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#276F55', // Fondo del contenedor del gráfico
          borderRadius: '16px', // Bordes redondeados
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // Sombra
        }}
      >
        <Chart
          chartType="ScatterChart"
          data={dataTemperatura}
          width="100%"
          height="400px"
          options={options}
          legendToggle
        />
      </Paper>
    </>
  );
}
