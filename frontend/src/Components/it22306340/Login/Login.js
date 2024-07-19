import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';  
import { Link } from 'react-router-dom';
import Header from '../../it22306340/Header/Header';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const URL = "http://localhost:5000/users"; 

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
    h2: {
      fontSize: '24px',
      marginBottom: '20px',
    },
  },
});

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${URL}?userName=${username}`);
      const user = response.data.users.find((user) => user.password === password);

      if (user) {
        login(user); 
        navigate(`/cushome/${user._id}`); 
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header /><br />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height to center vertically
          backgroundColor: '#f5f5f5', // Optional: background color for better visual
        }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={10}
            sx={{
              background: 'rgba(0, 0, 128, 0.312)',
              padding: 2,
              borderRadius: 2,
              textAlign: 'center',
              color: 'white',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Typography variant="h2" style={{ color: 'black' }}>Login</Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    color: 'black',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  style: {
                    color: 'black',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{ mt: 2, fontSize: '20px' }}
              >
                Login
              </Button>
              <Typography style={{ color: 'black', fontSize: '15px' }} sx={{ mt: 2 }}>Don't have an Account...?</Typography>
              <Link to="/CSregi?from=log" style={{ textDecoration: 'none' }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 1, fontSize: '15px' }}
                >
                  Register Here
                </Button>
              </Link>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
