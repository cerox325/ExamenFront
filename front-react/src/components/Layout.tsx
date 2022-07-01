import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from './AppBar';
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#43b02a",
    },
    warning: {
      main: "#e63422",
    },
  },
});

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <ThemeProvider theme={theme}>
   <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '3', background: '#000000', color: '#FFFFFF' }}>
      <Navbar />
      <Box sx={{ flex: '1 1 auto', margin: 2 }}>{children}</Box>
    </Box>
    </ThemeProvider>
 
  );
};

export default Layout;
