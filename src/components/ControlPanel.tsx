import { Paper , Typography,Box,InputLabel,MenuItem,FormControl,Select,SelectChangeEvent } from "@mui/material";
import {useRef,useState} from 'react';


export default function ControlPanel({ setSelectedVariable  } : any){

    const descriptionRef = useRef<HTMLDivElement>(null);
    let[,setSelected] = useState(-1)
    
    const handleChange = (event:SelectChangeEvent) => {
        console.log(parseInt(event.target.value))
        let value = parseInt(event.target.value)
        setSelectedVariable(value)
        let idx = value
        setSelected(idx);
        if (descriptionRef.current !== null) {
			descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : ""
		}
    }


    let items = [
        {"name":"Temperatura","description":"Es una magnitud referida a la noción de calor medible mediante un termómetro"},
		{"name":"Precipitación", "description":"Cantidad de agua, en forma de lluvia, nieve o granizo, que cae sobre una superficie en un período específico."}, 
		{"name": "Humedad", "description":"Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje."}, 
        {"name":"Presion","description":"Magnitud que se define como la derivada de la fuerza con respecto al área."}
	]

    let options = items.map( (item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem> )
    

    return (
        
		<Paper
        sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column'
        }}
    >

        <Typography mb={2} component="h3" variant="h6" color="#276F55">
            Variables Meteorológicas
        </Typography>

        <Box sx={{ minWidth: 120 }}>
            
            <FormControl fullWidth>
                <InputLabel id="simple-select-label">Variables</InputLabel>
                <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    label="Variables"
                    defaultValue='-1'
                    onChange={handleChange}
                >
                    <MenuItem key="-1" value="-1" disabled>Seleccione una variable</MenuItem>

                    {options}

                </Select>
                
            </FormControl>
			<Typography ref={descriptionRef} mt={2} component="p" color="text.secondary" />

        </Box>


    </Paper>
    )
}