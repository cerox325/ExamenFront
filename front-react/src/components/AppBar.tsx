import { Grid, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Pelicula } from '../api/pelicula';
import axiosClient from '../config/axios';
import Carret from './Carret';
const qs = require('qs');




const Navbar = () => {
    const [data, setdata] = useState<Pelicula[]>([]);
    const [busqueda, setbusqueda] = useState<string>('');
    const properties = {
        arrayData: data
    }


    const changeName = (data: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = data.target;
        setbusqueda(value);
        searh()
    };

    const searh = () => {
        axiosClient.post(`/api/pelicula-getName.php`, qs.stringify({
            "nombre": busqueda,
        })).subscribe({
            next: (res: any) => {
                const respuesta: Pelicula[] = res.data as Pelicula[];
                console.log(respuesta);
                if (respuesta.toString() === "0 results") {
                    return;
                }
                    setdata(respuesta);
            },
            error: (e: any) => {
                console.log(e);
            },
            complete: () => {
            }
        })
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, color: 'white', paddingTop: '1vh' }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography>
                            PELIS PLUS
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'auto', sm: 'block' } }}
                        >
                        </Typography>
                        <TextField sx={{background: 'white'}}  onChange={changeName} value={busqueda} label="Buscar..." variant='filled' focused />
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid>
                <Carret
                    key={1}
                    {...properties}
                />
            </Grid>
        </>
    );
};

export default Navbar;
