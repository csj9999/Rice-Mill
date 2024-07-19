import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Typography, Paper, Button, Avatar, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CusHeader from "../cusheader/cusHeader";
import ProNav from "../ProNav/ProNav";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000080',
    },
    secondary: {
      main: '#030368',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          textTransform: 'none',
        },
      },
    },
  },
  typography: {
    h6: {
      fontSize: '16px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '14px',
      fontWeight: 400,
    },
  },
});

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUser(response.data.users);
      } catch (error) {
        setError("Error fetching user data.");
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CusHeader />
      <ProNav userId={user._id} />
      <Typography variant="h3" style={{ fontWeight: 'bold',textAlign: "center" }}>User Profile</Typography>

      <Container>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginTop: 3, backgroundColor: '#BDD3E3'}}>
          <Grid container spacing={2} alignItems="center" >
            <Grid item xs={12} md={3}>
              <Avatar sx={{ width: 80, height: 80 }}>A</Avatar> 
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h5" gutterBottom>{user.userName}</Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>{user.email}</Typography>
              <Button variant="contained" color="primary" component={Link} to={`/userupdate/${user._id}`}>
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginTop: 3 ,backgroundColor: '#BDD3E3'}}>
          <Divider />
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
              <Typography variant="body1"><strong>First Name:</strong> {user.firstName}</Typography>
              <Typography variant="body1"><strong>Last Name:</strong> {user.lastName}</Typography>
              <Typography variant="body1"><strong>Customer/Business Name:</strong> {user.bName}</Typography>
              <Typography variant="body1"><strong>Business Registration Number:</strong> {user.bRegName}</Typography>
              <Typography variant="body1"><strong>Owner Name:</strong> {user.bOwner}</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, marginTop: 3,backgroundColor: '#BDD3E3' }}>
          <Divider />
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Billing Address</Typography>
              <Typography variant="body1"><strong>Address:</strong> {user.address}</Typography>
              
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default UserProfile;
