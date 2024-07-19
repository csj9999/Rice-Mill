import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";

import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";

const URL = "http://localhost:5000/users";

function Profile({ user }) {
  const { _id, userName, firstName, lastName, bName, bRegName, bOwner, address } = user;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete this account?");
    if (userConfirmed) {
      try {
        await axios.delete(`${URL}/${user._id}`);
        alert("Deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    
    <TableRow  sx={{ '&:nth-of-type(even)': { backgroundColor: '#BBD0E8' } }}>
    <TableCell>{userName}</TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{bName}</TableCell>
      <TableCell>{bRegName}</TableCell>
      <TableCell>{bOwner}</TableCell>
      <TableCell>{address}</TableCell>
      <TableCell>
        <div style={{ display: "flex" }}>
          <Button component={Link} to={`/pro/${_id}`} variant="contained" color="primary" style={{ marginRight: "8px" }}>
            Update
          </Button>
          <Button onClick={deleteHandler} variant="contained" sx={{
                          backgroundColor: '#B61C1C', // Custom color for delete button
                          '&:hover': {
                            backgroundColor: '#E43B37', // Darker shade on hover
                          },
                        }}>
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

const theme = createTheme({
  overrides: {
    MuiTableHead: {
      root: {
        '& th': {
          fontWeight: 'bold', // Bold font for table headings
          fontSize: '16px', // Increased font size for table headings
        },
      },
    },
    MuiTableRow: {
      root: {
        '&:nth-of-type(even)': {
          backgroundColor: '#f2f2f2', // Alternate row color
        },
      },
    },
  },
});

export default function ProfileContainer() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchHandler = async () => {
    const response = await axios.get(URL);
    return response.data;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.text("User Report", pageWidth / 2, 20, { align: "center" });

    doc.autoTable({
      startY: 30,
      head: [["Username", "First Name", "Last Name", "Business Name", "Business Reg. Name", "Owner", "Address"]],
      body: users.map((user) => [user.userName, user.firstName, user.lastName, user.bName, user.bRegName, user.bOwner, user.address]),
    });

    doc.save("users_report.pdf");
  };

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />
        <NavigationBar />
        <br />
        <div className="user-profile">
        <Typography variant="h3" style={{ fontWeight: 'bold',textAlign: "center" }}>All Users</Typography>
          
          <div className="add-user" style={{ float: "right" }}>
            <Link to="/ADregi?from=profile">
              <Button variant="contained" color="primary">
                Add User
              </Button>
            </Link>
          </div>
          <div className="search-and-download">
            <TextField
              className="all-orders-search"
              type="text"
              placeholder="Search by Username, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={downloadPDF} variant="contained" color="primary" style={{ marginLeft: "950px" }}>
              User Report
            </Button>
          </div>
          <br />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
              <TableRow  sx={{ '&:nth-of-type(odd)': { backgroundColor: '#1D67A3' } }}>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Username</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>First Name</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Business Name</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Business Reg. Number</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Owner</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Address</TableCell>
                  <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter((user) =>
                   // user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.bOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   // user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.bName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   // user.bRegName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.userName.toLowerCase().includes(searchQuery.toLowerCase()) 
                    //user.address.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((user) => (
                    <Profile key={user._id} user={user} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </ThemeProvider>
  );
}
