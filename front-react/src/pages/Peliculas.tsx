import { Grid, Typography } from '@mui/material';
// import React, { useState } from 'react';
import Carret from '../components/Carret';
import Mega from '../components/Mega';
//import Axios from 'axios-observable';
import { useEffect, useState } from 'react';
import { Pelicula } from '../api/pelicula';
import axiosClient from '../config/axios';
import { PeliculaMoreBuy } from '../api/peliculaMoreBuy';

function Peliculas() {
    const [data, setdata] = useState<Pelicula[]>([]);
    const [dataMega, setDataMega] = useState<PeliculaMoreBuy[]>([]);
    const properties = {
        arrayData: data
    }
    const propertiesMega = {
        arrayData: dataMega
    }

    const getAll = () => {
        axiosClient.get(`/api/pelicula-getAll.php`).subscribe({
            next: (res: any) => {
                const respuesta: Pelicula[] = res.data as Pelicula[];
                setdata(respuesta);

            },
            error: (e: any) => {
                console.log(e);
                const respuesta: Pelicula[] = []
                setdata(respuesta);
             },
            complete: () => {
            }
        })
    }


    const getAllBuy = () => {
        axiosClient.get(`/api/pelicula-getMoreBuy.php`).subscribe({
            next: (res: any) => {
                const respuesta: PeliculaMoreBuy[] = res.data as PeliculaMoreBuy[];
                setDataMega(respuesta);           
            },
            error: (e: any) => { console.log("error:",e) },
            complete: () => {
            }
        })
    }

    useEffect(() => {
        getAll();
        getAllBuy();
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid container>
            <Grid item md={20} xs={20} xl={20} sm={20} lg={20} >
                <Mega 
                 {...propertiesMega} />
            </Grid>
            <Grid item md={0} xs={20} xl={20} sm={20} lg={20}>
                <Typography>TOP 10</Typography>
                <Carret
                    key={1}
                    {...properties}
                />
            </Grid>
            <Grid item md={0} xs={20} xl={20} sm={20} lg={20}>
                <Carret
                    key={2}
                    {...properties}
                />
            </Grid>
        </Grid>
    );
}

export default Peliculas;
