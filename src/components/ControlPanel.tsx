import { Paper , Typography,Box,InputLabel,MenuItem,FormControl,Select,SelectChangeEvent } from "@mui/material";
import {useState,useRef} from 'react'
export default function ControlPanel(){

    let [selected , setSelected] = useState(-1)

    let items = [
		{"name":"Precipitación", "description":"Cantidad de agua, en forma de lluvia, nieve o granizo, que cae sobre una superficie en un período específico."}, 
		{"name": "Humedad", "description":"Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje."}, 
		{"name":"Nubosidad", "description":"Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida."}
	]

    let options = items.map( (item, key) => <MenuItem key={key} value={key}>{item["name"]}</MenuItem> )
    
    const handleChange = (event: SelectChangeEvent) => {
        let idx = parseInt(event.target.value)
        setSelected(idx)

        if (descriptionRef.current !== null) {
			descriptionRef.current.innerHTML = (idx >= 0) ? items[idx]["description"] : ""
		}
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

        <Typography mb={2} component="h3" variant="h6" color="primary">
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
            {/* Muestra la descripción de la variable seleccionada */}
            <Typography mt={2} component="p" color="text.secondary">
			    {
				    (selected >= 0)?items[selected]["description"]:""
			    }
			</Typography>
			<Typography ref={descriptionRef} mt={2} component="p" color="text.secondary" />

        </Box>


    </Paper>
    )
}