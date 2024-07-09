import {Chart} from "react-google-charts"
import {Paper} from "@mui/material"


export default function TemperatureChart(){

    let options = {
        title : "Temperatura por Hora",
        curveType : "function",
        legend: {position : "right"}
    }
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
                    flexDirection: 'column'
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
    )
    
}