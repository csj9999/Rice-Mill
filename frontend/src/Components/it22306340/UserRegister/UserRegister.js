import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // your primary color
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
    bName: "",
    firstName: "",
    lastName: "",
    bOwner: "",
    general: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
    
    let error = "";
    switch (name) {
      case 'userName':
        if (value.length < 4) error = "User name must be at least 4 characters long.";
        break;
      case 'password':
        if (value.length < 6) error = "Password must be at least 6 characters long.";
        break;
      case 'bName':
        if (!/^[a-zA-Z]+$/.test(value)) error = "Business name should not contain numbers.";
        break;
      case 'bRegName':
        if (value.length < 6) error = "Business Registration Number must be at least 6 characters long.";
        break;
      case 'firstName':
        if (!/^[a-zA-Z]+$/.test(value)) error = "First name should not contain numbers.";
        break;
      case 'lastName':
        if (!/^[a-zA-Z]+$/.test(value)) error = "Last name should not contain numbers.";
        break;
      case 'bOwner':
        if (!/^[a-zA-Z\s]+$/.test(value)) error = "Business owner should not contain numbers.";
        break;
      case 'address':
        if (value.length < 6) error = "Address must be at least 6 characters long.";
        break;
      default:
        break;
    }
    
    setErrors((prevState) => ({
      ...prevState,
      [name]: error
    }));
  };

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

    if (!/^[a-zA-Z]+$/.test(inputs.bName)) {
      valid = false;
      newErrors.bName = "Business name should not contain numbers.";
    }

    if (!/^[a-zA-Z]+$/.test(inputs.firstName)) {
      valid = false;
      newErrors.firstName = "First name should not contain numbers.";
    }

    if (!/^[a-zA-Z]+$/.test(inputs.lastName)) {
      valid = false;
      newErrors.lastName = "Last name should not contain numbers.";
    }

    if (!/^[a-zA-Z\s]+$/.test(inputs.bOwner)) {
      valid = false;
      newErrors.bOwner = "Business owner should not contain numbers.";
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
    history('/log');
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
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#F1F5F7' }}>
            <Typography variant="h4" gutterBottom align="center" fontSize="40px" style={{ fontWeight: 'bold', textAlign: "center" }}>Join Us: Register for Exclusive Access!</Typography>
            <div>
              <Typography variant="h6" style={{ fontWeight: 'bold', textAlign: "center" }}>Customer Registration Form</Typography>
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
                      error={!!errors.userName}
                      helperText={errors.userName}
                      required
                    />
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
                      onChange={handleChange}
                      value={inputs.firstName}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
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
                      error={!!errors.lastName}
                      helperText={errors.lastName}
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
                      error={!!errors.bName}
                      helperText={errors.bName}
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
                      onChange={handleChange}
                      value={inputs.bOwner}
                      error={!!errors.bOwner}
                      helperText={errors.bOwner}
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
                      error={!!errors.address}
                      helperText={errors.address}
                      required
                    />
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
