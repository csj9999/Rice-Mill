import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Grid } from '@mui/material';
import Header from '../Header/Header';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavigationBar from "../NavigationBar/NavigationBar";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/issues');
        setIssues(response.data.issues);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching issues:', err);
        setError('Failed to load issues.');
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleDelete = async (issueId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this issue?");
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/issues/${issueId}`);
        setIssues(issues.filter((issue) => issue.issueId !== issueId));
      } catch (error) {
        console.error('Error deleting issue:', error);
      }
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.text("Issue Report", pageWidth / 2, 20, { align: "center" });

    doc.autoTable({
      startY: 30,
      head: [["Issue ID", "Issue Date/Time", "Issue Description"]],
      body: issues.map((issue) => [
        issue.issueId,
        new Date(issue.issueDate).toLocaleString(),
        issue.issueDescription,
      ]),
    });

    doc.save("issue_report.pdf"); // Save the generated PDF
  };

  const filteredIssues = issues.filter(
    (issue) =>
      String(issue.issueId).toLowerCase().includes(searchQuery.toLowerCase()) /*||
      new Date(issue.issueDate).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())*/
  );

  if (loading) {
    return <p>Loading issues...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <NavigationBar />
      <Container maxWidth="xl">
        <Typography variant="h3" style={{ fontWeight: 'bold', textAlign: "center" }}>Reported Issues</Typography>

        <Grid container justifyContent="flex-end" alignItems="center" marginBottom={2}>
          <Grid item>
            <TextField
              type="text"
              placeholder="Search by Issue ID or Date/Time"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item marginLeft={2}>
            <Button onClick={generateReport} variant="contained" color="primary">
              Generate Report
            </Button>
          </Grid>
        </Grid>

        {filteredIssues.length === 0 ? (
          <Typography variant="body1" align="center">No issues found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#1D67A3' } }}>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Issue ID</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Issue Date/Time</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Issue Description</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.issueId} sx={{ '&:nth-of-type(even)': { backgroundColor: '#BBD0E8' } }}>
                    <TableCell>{issue.issueId}</TableCell>
                    <TableCell>{new Date(issue.issueDate).toLocaleString()}</TableCell>
                    <TableCell>{issue.issueDescription}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(issue.issueId)}
                        variant="contained"
                        sx={{
                          backgroundColor: '#B61C1C', // Custom color for delete button
                          '&:hover': {
                            backgroundColor: '#E43B37', // Darker shade on hover
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
};

export default IssueList;
