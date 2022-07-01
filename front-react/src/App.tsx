import { Grid } from '@mui/material';
import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Peliculas from './pages/Peliculas';

function App() {
  return (
    <Layout>
      <Grid>
        <Peliculas />
      </Grid>
    </Layout>
  );
}

export default App;
