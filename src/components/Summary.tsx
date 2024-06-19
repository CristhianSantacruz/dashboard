import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import sunrise from '../assets/imagen.jpeg'
import Button from '@mui/material/Button'

export default function Summary(){
    return (
        <Card sx={{maxWidth:345, m:2}}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={sunrise}
                alt="Almanecer"
            ></CardMedia>
            <CardContent>
                    <Typography gutterBottom component="h2" variant="h6" color="primary">
                        Amanecer
                    </Typography>
                    <Typography component="p" variant="h4">
                        05:19:08
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                    	en 17 Junio, 2024
                    </Typography>
                    <Button onClick={() => { hello("amanecer")}} color='success' variant='contained' 
             >Ver</Button>
                </CardContent>
        </CardActionArea>
        </Card>
    )
}

function hello(message : string){
    alert(message)
   
}
