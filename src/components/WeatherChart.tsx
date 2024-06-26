import { Chart }  from "react-google-charts"
import { Paper } from "@mui/material" 


export default function WeatherChart(){

    let options = {
        title : "Precipitacion,Humedad y Nubosidad vs Hora",
        curveType : "funtion",
        legend : {position: "right"}
        
    }

    const data = [
        ["Hora", "Precipitación", "Humedad", "Nubosidad"],
        ["03:00", 13, 78, 75],
        ["06:00", 4, 81, 79],
        ["09:00", 7, 82, 69],
        ["12:00", 3, 73, 62],
        ["15:00", 4, 66, 75],
        ["18:00", 6, 64, 84],
        ["21:00", 5, 77, 99]
    ];
    return (
		<Paper
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<Chart
				chartType="ColumnChart"
				data={data}
				width="100%"
				height="400px"
				options={options}
                legendToggle
		/>
		</Paper>
    )
}