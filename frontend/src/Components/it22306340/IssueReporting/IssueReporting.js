import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Typography, TextField, Button, Container, Paper, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CusHeader from "../cusheader/cusHeader";
import ProNav from "../ProNav/ProNav";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // your primary color
    },
  },
});

const IssueReporting = () => {
  const [issueDescription, setIssueDescription] = useState(''); 
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const newIssue = {
        issueDescription, 
      };

      await axios.post('http://localhost:5000/issues', newIssue);

      setIssueDescription(''); 
      setMessage('Issue reported successfully!'); 

      // Navigate to /userp
      setTimeout(() => navigate('/userp'), 1500); 
    } catch (error) {
      console.error('Error reporting issue:', error);
      setMessage('Failed to report issue.'); 
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CusHeader />
        <ProNav />

        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', 
            backgroundColor: '#f5f5f5', 
          }}
        >
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>Report an Issue</Typography>
              {message && <Typography variant="body1" align="center" sx={{ marginBottom: 1 }}>{message}</Typography>} 
              <form onSubmit={handleSubmit}> 
                <TextField
                  label="Issue Description"
                  variant="outlined"
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  required
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ marginBottom: 2 }} 
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Submit Issue</Button>
              </form>
            </Paper>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default IssueReporting;
