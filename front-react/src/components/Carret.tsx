import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Pelicula } from '../api/pelicula';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axiosClient from '../config/axios';
const qs = require('qs');

type propsData = {
    arrayData: Pelicula[]
}

function Carret(props: propsData) {
    const itemData = props.arrayData
    const [open, setOpen] = React.useState(false);
    const [img, setImg] = useState<string>('');
    const [nombre, setnombre] = useState<string>('');
    const [descripcion, setdescripcion] = useState<string>('');
    const [precio, setprecio] = useState<number>(0);
    const [tiempoRenta, settiempoRenta] = useState<string>('');
    const [total, settotal] = useState<number|string>('');
    const [id, setid] = useState<number>(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        settiempoRenta('')
        settotal(0);
        setOpen(false);
    };

    const Seleccion = (data: any) => {
        setImg(data.url)
        setdescripcion(data.descripcion)
        setnombre(data.nombre)
        setprecio(data.precio)
        setid(data.id)
    }

    const handleChange = (event: SelectChangeEvent) => {
        const calculo = parseInt(event.target.value) * precio;
        settotal(calculo);
        settiempoRenta(event.target.value);
    };

    const Rentar = () => {
        axiosClient.post(`/api/rentar.php`, qs.stringify({
            "id_pelicula" : id,
            "tiempo" : tiempoRenta ,
            "total" : total
         })).subscribe({
            next: (res: any) => {
                window.location.reload();
                handleClose();
            },
            error: (e: any) => {
                console.log(e);
                handleClose();
            },
            complete: () => {
            }
        })

    }


    return (
        <Grid>
            <ImageList sx={{ width: '100%', height: '20%' }} cols={10} rowHeight={164} variant='quilted'>
                {itemData.map((item, i) => (
                    <Card key={i} sx={{ background: 'black', border: '0.5vh solid white' }}>
                        <CardContent>
                            <ImageListItem key={item.id}>
                                <img
                                    src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                                    alt={item.nombre}
                                    loading="eager"
                                />
                                <Grid sx={{ paddingTop: '2vh', textAlign: 'center' }}>
                                    <Button sx={{ color: 'white', background: 'red' }} variant='outlined' onClick={() => {
                                        handleClickOpen();
                                        Seleccion(item);
                                    }} >Rentar</Button>
                                </Grid>
                            </ImageListItem>
                        </CardContent>
                    </Card>
                ))}
            </ImageList>
            <Grid>
                <Dialog open={open} onClose={handleClose} >
                    <DialogTitle>Rentar Pelicula : {nombre}</DialogTitle>
                    <DialogContent>
                        <Grid container sx={{ textAlign: 'center' }}>
                            <Grid item xs={20}>
                                <img style={{ width: '100%', height: '30vh' }} src={img} alt='imagen' />
                            </Grid>
                            <Grid item xs={20}>
                                <Typography>
                                    Descripción:
                                    {descripcion}
                                </Typography>
                            </Grid>
                            <Grid item xs={20}>
                                <Typography>$ {precio}.00 MX por día
                                </Typography>
                            </Grid>
                            <Grid item xs={20}>
                                <FormControl sx={{ m: 1, minWidth: 80 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Días</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={tiempoRenta}
                                        onChange={handleChange}
                                        autoWidth
                                        label="Dias"
                                    >
                                        <MenuItem value={'1 día'}>1</MenuItem>
                                        <MenuItem value={'2 días'}>2</MenuItem>
                                        <MenuItem value={'3 días'}>3</MenuItem>
                                        <MenuItem value={'4 días'}>4</MenuItem>
                                        <MenuItem value={'5 días'}>5</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={20}>
                                <Typography>$ {total}.00 MX</Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={Rentar}>Rentar</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    );
}

export default Carret;
