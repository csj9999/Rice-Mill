import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CusHeader from "../cusheader/cusHeader";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // or your preferred primary color
    },
  },
});

function CusUpdate() {
  const [inputs, setInputs] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    bName: '',
    bRegName: '',
    bOwner: '',
    address: ''
  });

  const [errors, setErrors] = useState({
    password: '',
    bRegName: '',
    userName: '',
    address: '',
    general: ''
  });

  const [error, setError] = useState(null);
  const history = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const from = searchParams.get('from'); // Get the 'from' query parameter

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const userData = response.data.users;

        setInputs({
          userName: userData.userName || '',
          password: userData.password || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          bName: userData.bName || '',
          bRegName: userData.bRegName || '',
          bOwner: userData.bOwner || '',
          address: userData.address || ''
        });
      } catch (error) {
        setError("Error fetching user data. User might not exist.");
      }
    };

    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: ''
    }));
  };

  // Validations
  const validateInputs = () => {
    let valid = true;
    let newErrors = {};

    if (inputs.password.length < 6) {
      valid = false;
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (inputs.bRegName.length < 6) {
      valid = false;
      newErrors.bRegName = "Business Registration Number must be at least 6 characters long.";
    }

    if (inputs.userName.length < 4) {
      valid = false;
      newErrors.userName = "User name must be at least 4 characters long.";
    }

    if (inputs.address.length < 6) {
      valid = false;
      newErrors.address = "Address must be at least 6 characters long.";
    }

    if (!inputs.bName || !inputs.address || !inputs.bOwner || !inputs.firstName || !inputs.lastName) {
      valid = false;
      newErrors.general = "Please fill all required fields.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }

    try {
      await sendRequest();
      window.alert("Updated Successfully!");
      history('/cushome');
      window.location.reload();
    } catch (error) {
      setError("Error updating user data.");
    }
  };

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/users/${id}`, {
      userName: String(inputs.userName),
      password: String(inputs.password),
      firstName: String(inputs.firstName),
      lastName: String(inputs.lastName),
      bName: String(inputs.bName),
      bRegName: String(inputs.bRegName),
      bOwner: String(inputs.bOwner),
      address: String(inputs.address)
    }).then(res => res.data);
  };

  return (
    <ThemeProvider theme={theme}>
      <CusHeader /><br/><br/>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center">Update User Information</Typography>
          {error && <Typography variant="body1" color="error" align="center">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  id="userName"
                  name="userName"
                  value={inputs.userName}
                  onChange={handleChange}
                  error={!!errors.userName}
                  helperText={errors.userName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={inputs.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  value={inputs.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  value={inputs.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business Name"
                  id="bName"
                  name="bName"
                  value={inputs.bName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business Registration Number"
                  id="bRegName"
                  name="bRegName"
                  value={inputs.bRegName}
                  onChange={handleChange}
                  error={!!errors.bRegName}
                  helperText={errors.bRegName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business Owner"
                  id="bOwner"
                  name="bOwner"
                  value={inputs.bOwner}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  id="address"
                  name="address"
                  multiline
                  rows={4}
                  value={inputs.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  required
                />
              </Grid>
            </Grid>
            {errors.general && <Typography variant="body1" color="error" align="center">{errors.general}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"

              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default CusUpdate;
