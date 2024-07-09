import axios from 'axios';
import { parseStringPromise } from  'xml2js';
import xml2js from 'xml2js'
import { xml2json } from 'xml-js';
const url = 'https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=a125c79b98b9cabf669964cf63329487';

export   const fetchAndParseXML = async () => {
    try {
        // Realizar la solicitud a la API
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/xml',
            },
        });

        // Obtener el XML de la respuesta
        const xml = response.data;
        console.log(xml)

        
        const json = xml2json(xml, { spaces: 2 }); // Set the "spaces" option for formatted output
        console.log(json);
      
        console.log(JSON.stringify(xml))
        
    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
};