import { Paper , Typography,Box,InputLabel,MenuItem,FormControl,Select,SelectChangeEvent } from "@mui/material";
import {useRef} from 'react';
import { fetchAndParseXML } from "../data/openwatherdata";
export default function ControlPanel(){


    let items = [
		{"name":"Precipitación", "description":"Cantidad de agua, en forma de lluvia, nieve o granizo, que cae sobre una superficie en un período específico."}, 
		{"name": "Humedad", "description":"Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje."}, 
		{"name":"Nubosidad", "description":"Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida."},
        {"name":"Visibilidad","description":"Es la distancia máxima a la que se pueden ver y reconocer claramente los objetos bajo condiciones atmosféricas actuales"}
	]

    let options = items.map( (item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem> )
    
    const handleChange = (event: SelectChangeEvent) => {
        let idx = parseInt(event.target.value)
        if (descriptionRef.current !== null) {
			descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : ""
		}
        console.log(fetchAndParseXML())
    }
    const descriptionRef = useRef<HTMLDivElement>(null);
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