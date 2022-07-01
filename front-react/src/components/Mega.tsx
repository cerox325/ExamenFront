import { Grid } from '@mui/material';
import React from 'react';
import { PeliculaMoreBuy } from '../api/peliculaMoreBuy';
type propsData = {
    arrayData: PeliculaMoreBuy[]
}

function Mega(props: propsData)  {
    return (
        <Grid >
            <img style={{width: '100%', height:'50vh'}} src={props.arrayData[0]?.url} alt='test' />
        </Grid>
    );
}

export default Mega;
