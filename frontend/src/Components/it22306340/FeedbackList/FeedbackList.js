import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Grid } from '@mui/material';
import Header from '../Header/Header';
import NavigationBar from "../NavigationBar/NavigationBar";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feedbacks');
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (feedbackId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this Feedback?");
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/feedbacks/${feedbackId}`);
        alert("Deleted successfully!");
        setFeedbacks(feedbacks.filter((fb) => fb._id !== feedbackId));
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.text("Feedback Report", pageWidth / 2, 20, { align: "center" } );

    doc.autoTable({
      startY: 30,
      head: [["Customer ID", "Product Name", "Feedback Message", "Date/Time"]],
      body: feedbacks.map((feedback) => [
        feedback.customerId,
        feedback.productName,
        feedback.feedbackMessage,
        new Date(feedback.dateTime).toLocaleString(),
      ]),
    });

    doc.save("feedback_report.pdf"); // Save as PDF
  };

  const filteredFeedbacks = feedbacks.filter(
    (fb) =>
      fb.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.feedbackMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  return (
    <div>
      <Header />
      <NavigationBar />
      <Container maxWidth="xl">
      <Typography variant="h3" style={{ fontWeight: 'bold',textAlign: "center" }}>Feedback List</Typography>

        <Grid container justifyContent="flex-end" alignItems="center" marginBottom={2}>
          <Grid item>
            <TextField
              type="text"
              placeholder="Search by Customer ID, Product Name, or Feedback Message"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item marginLeft={2}>
            <Button onClick={downloadPDF} variant="contained" color="primary">
              Download Report
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
            <TableRow  sx={{ '&:nth-of-type(odd)': { backgroundColor: '#1D67A3' } }}>
            <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Product Name</TableCell>
            <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Feedback Message</TableCell>
            <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Date/Time</TableCell>
            <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFeedbacks.map((feedback, index) => (
                <TableRow key={feedback._id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#BBD0E8' } }}>
                  <TableCell>{feedback.productName}</TableCell>
                  <TableCell>{feedback.feedbackMessage}</TableCell>
                  <TableCell>{new Date(feedback.dateTime).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(feedback._id)} variant="contained" sx={{
                          backgroundColor: '#B61C1C',
                          '&:hover': {
                            backgroundColor: '#E43B37', 
                          },
                        }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default FeedbackList;
