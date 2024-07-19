import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  
    },
  },
});

function CusRegister() {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    bName: "",
    bRegName: "",
    bOwner: "",
    address: ""
  });

  const [errors, setErrors] = useState({
    password: "",
    bRegName: "",
    userName: "",
    address: "",
    general: ""
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: ""
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

    await sendRequest();
    window.alert("Registered Successfully!");
    history('/pro');
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/users", {
      userName: String(inputs.userName),
      password: String(inputs.password),
      firstName: String(inputs.firstName),
      lastName: String(inputs.lastName),
      bName: String(inputs.bName),
      bRegName: String(inputs.bRegName),
      bOwner: String(inputs.bOwner),
      address: String(inputs.address),
    }).then(res => res.data);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <br/><br/>
        <Container maxWidth="sm" >
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2,backgroundColor: '#F1F5F7' }}>
            <Typography variant="h4" gutterBottom align="center" fontSize="40px"style={{ fontWeight: 'bold',textAlign: "center" }}>Join Us: Register for Exclusive Access!</Typography>
            <div>
              <Typography variant="h6" style={{ fontWeight: 'bold',textAlign: "center" }}>Customer Registration Form</Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      id="userName"
                      name="userName"
                      onChange={handleChange}
                      value={inputs.userName}
                      required
                    />
                    {errors.userName && <Typography color="error">{errors.userName}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={inputs.password}
                      required
                    />
                    {errors.password && <Typography color="error">{errors.password}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      id="firstName"
                      name="firstName"
                      onChange={handleChange}
                      value={inputs.firstName}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      id="lastName"
                      name="lastName"
                      onChange={handleChange}
                      value={inputs.lastName}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Business Name"
                      id="bName"
                      name="bName"
                      onChange={handleChange}
                      value={inputs.bName}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Business Registration Number"
                      id="bRegName"
                      name="bRegName"
                      onChange={handleChange}
                      value={inputs.bRegName}
                      required
                    />
                    {errors.bRegName && <Typography color="error">{errors.bRegName}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Business Owner"
                      id="bOwner"
                      name="bOwner"
                      onChange={handleChange}
                      value={inputs.bOwner}
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
                      onChange={handleChange}
                      value={inputs.address}
                      required
                    />
                    {errors.address && <Typography color="error">{errors.address}</Typography>}
                  </Grid>
                  <Grid item xs={12}>
                    {errors.general && <Typography color="error">{errors.general}</Typography>}
                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default CusRegister;
