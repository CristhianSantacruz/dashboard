import {Paper,Icon,Typography,Grid} from '@mui/material'
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined'
import OpacityIcon from '@mui/icons-material/Opacity';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react'

export interface AverageConfig {
    
    precipitation : number,
    humidity : number,
    temperature : number,
    visibility : number,
}

const AverageIndicator = ({ icon, title, value,unit }: { icon: React.ReactNode, title: string, value: number ,unit:string}) => {
    return (
        <Paper
            sx={{
                m: 1,
                p: 1,
                marginRight:2,    
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '5px solid #ccc',           
                borderBlockEndColor:'#276F55',
                boxShadow: 3,
            }}
        >
            <Icon sx={{ fontSize: 40, mb: 1 }}>{icon}</Icon>
            <Typography component="h2" variant="h6" color="#276F55" gutterBottom>
                {title}
            </Typography>
            <Typography component="p" variant="h4">
                {value.toFixed(2)} {unit}
            </Typography>
        </Paper>
    );
};

const AverageIndicators: React.FC<AverageConfig> = (averageConfig:AverageConfig) => {
    return (
        <Grid container spacing={2} sx={{marginTop:2,marginLeft:0}}>
            <Grid item xs={6} lg={6}>
                <AverageIndicator unit='% 🌧️' icon={<WaterDropOutlinedIcon sx={{ fontSize: 40, color: 'blue' }} />} title="Precipitación Probabilidad Promedio" value={averageConfig.precipitation * 100}/>
            </Grid>
            <Grid item xs={6} lg={6}>
                <AverageIndicator unit='%'  icon={<OpacityIcon sx={{fontSize:40,color:'blue'}} />} title="Humedad Promedio" value={averageConfig.humidity} />
            </Grid>
            <Grid item xs={6} lg={6}>
                <AverageIndicator unit='°C' icon={<ThermostatIcon sx={{fontSize:40,color:'red'}}/>} title="Temperatura Promedio" value={averageConfig.temperature} />
            </Grid>
            <Grid item xs={6} lg={6}>
                <AverageIndicator unit='☁️' icon={<VisibilityIcon sx={{fontSize:40,color:'aqua'}} />} title="Visibilidad Promedio" value={averageConfig.visibility} />
            </Grid>
        </Grid>
    );
};
export default AverageIndicators