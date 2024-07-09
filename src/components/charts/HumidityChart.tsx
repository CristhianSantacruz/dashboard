import { Chart }  from "react-google-charts"
import { Paper } from "@mui/material" 


export default function WeatherChart(){
    let options = {
        title : "Humedad Por Hora",
        curveType : "function",
        legend : {position: "right"}
        
    }
    const dataHumedad = [
        ["Hora", "2027-07-09", "2027-07-10", "2027-07-11", "2027-07-12", "2027-07-13"],
        ["03:00", 13, 78, 75, 23, 23],
        ["06:00", 14, 76, 74, 22, 24],
        ["09:00", 15, 73, 73, 21, 25],
        ["12:00", 16, 71, 72, 20, 26],
        ["15:00", 17, 74, 71, 19, 27],
        ["18:00", 18, 75, 70, 18, 28],
        ["21:00", 19, 71, 69, 17, 29],
    ];
    return (
		<>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
                    >
                <Chart
                    chartType="ScatterChart"
                    data={dataHumedad}
                    width="100%"
                    height="400px"
                    options={options}
                    legendToggle
                />
		    </Paper>

        </>
    )
}