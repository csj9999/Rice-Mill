import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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

const OrderListPage = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders?userId=${userId}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders(); 
  }, [userId]);

  const deleteHandler = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this order?");
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/orders/${id}`);
        alert("Order deleted successfully!");
        fetchAllOrders(); 
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("An error occurred while deleting the order.");
      }
    }
  };

  const handleProfileClick = (order) => {
    navigate(`/Adfeed/${userId}`, {
      state: {
        customerId: order.customerId,
        productName: order.productName,
      },
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.text("Order List", pageWidth / 2, 20, { align: "center" });

    doc.autoTable({
      startY: 30,
      head: [["Order ID", "Customer ID", "Product Name", "Total Price", "Order Date", "Status"]],
      body: orders.map((order) => [
        order.orderId,
        order.customerId,
        order.productName ?? "N/A", 
        order.totalPrice?.toFixed(2) ?? "N/A",
        new Date(order.orderDate).toLocaleString(),
        order.status,
      ]),
    });

    doc.save("orders.pdf"); // Save as PDF
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CusHeader />
        <ProNav />
        <br />
        <div className="all-orders-container">
        <Typography variant="h3" style={{ fontWeight: 'bold',textAlign: "center" }}>Order History</Typography>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
            <TextField
             style={{ width: "250px", marginRight: "10px"  }}
              className="all-orders-search"
              type="text"
              placeholder="Search Order ID,Status,Product Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Button onClick={downloadPDF} variant="contained" color="primary" className="pdf-download-button">Order Report</Button>
          </div>

          {filteredOrders.length === 0 ? (
            <Typography variant="body1" align="center">No orders found.</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table className="orders-table" aria-label="Orders table">
                <TableHead>
                <TableRow  sx={{ '&:nth-of-type(odd)': { backgroundColor: '#1D67A3' } }}>
                    <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Order ID</TableCell>
                    <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Product Name</TableCell>
                    <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Total Price</TableCell>
                    <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Order Date</TableCell>
                    <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell variant="body1" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => (
                <TableRow key={order._id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#BBD0E8' } }}>
                <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.productName ?? "N/A"}</TableCell>
                      <TableCell>${order.totalPrice?.toFixed(2) ?? "N/A"}</TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <div className="user-profile-buttons">
                          <Button onClick={() => handleProfileClick(order)} variant="contained" color="primary" className="update-button" style={{ marginRight: "5px"}} >Add Feedback</Button>
                          <Button onClick={() => deleteHandler(order._id)} variant="contained" color="error" className="delete-button">Delete Order</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default OrderListPage;
