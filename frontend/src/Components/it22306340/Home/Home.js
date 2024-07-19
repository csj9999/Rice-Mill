import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Grid, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from '../Header/Header';
import crmbg from '../pictures/crmbg.jpg'; // Import the background image

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // your primary color
    },
  },
});

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <Box
          sx={{
            backgroundImage: `url(${crmbg})`, // Set the background image
            backgroundSize: 'cover', // Cover the entire box
            minHeight: '100vh', // Set a minimum height to cover the entire viewport
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom className="dashboard-title">
              CRM Dashboard
            </Typography>
            <Typography variant="h5" align="center" gutterBottom className="dashboard-subtitle">
              Welcome Customer Management Dashboard...!
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Button variant="contained" color="primary" fullWidth component={Link} to="/pro">
                  Manage Users
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="contained" color="primary" fullWidth component={Link} to="/or">
                  View User Orders
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="contained" color="primary" fullWidth component={Link} to="/feed">
                  View Feedbacks
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="contained" color="primary" fullWidth component={Link} to="/issue-list">
                  View Reported Issues
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Home;
