import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { v4 as uuidv4 } from 'uuid';  // Import UUID library to generate unique IDs
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Alert } from '@mui/material';
import ProNav from "../ProNav/ProNav";
import cusHeader from "../cusheader/cusHeader";

const AddFeedback = () => {
  const location = useLocation();
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const initialData = location.state || {}; 

  const [customerId] = useState(initialData.customerId);
  const [productName] = useState(initialData.productName);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackId = uuidv4();  

    const newFeedback = {
      feedbackId,
      customerId,
      productName,
      feedbackMessage,
    };

    try {
      const response = await axios.post('http://localhost:5000/feedbacks', newFeedback);
      console.log('Feedback added:', response.data);
      setFeedbackMessage('');
      setAlert({ show: true, message: 'Feedback added successfully!', severity: 'success' });
      setTimeout(() => {
        navigate('/cusorder'); 
      }, 2000); 
    } catch (error) {
      console.error('Error adding feedback:', error);
      setAlert({
        show: true,
        message: `Failed to add feedback: ${error.response?.data?.message || error.message}`,
        severity: 'error',
      });
    }
  };

  return (
    <div>
      <cusHeader />
      <ProNav />
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Feedback for Product
          </Typography>
          <form onSubmit={handleSubmit}>
          
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Product Name"
                value={productName}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Feedback Message"
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                required
              />
            </Box>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Feedback
            </Button>
          </form>
          {alert.show && (
            <Box sx={{ mt: 3 }}>
              <Alert severity={alert.severity}>{alert.message}</Alert>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default AddFeedback;
