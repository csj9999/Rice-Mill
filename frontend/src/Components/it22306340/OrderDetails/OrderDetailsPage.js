import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Grid } from "@mui/material";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteHandler = async (id) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this order?");
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/orders/${id}`);
        alert("Deleted successfully!");
        fetchAllOrders();
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("An error occurred while deleting the order.");
      }
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.text("Order List", pageWidth / 2, 20, { align: "center" });

    doc.autoTable({
      startY: 30,
      head: [["Order ID",  "Total Price", "Order Date", "Status"]],
      body: orders.map((order) => [
        order.orderId,
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
    order.productName.toLowerCase().includes(searchQuery.toLowerCase()) /*||
      order.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(order.orderDate).toLocaleDateString().toLowerCase().includes(searchQuery.toLowerCase())*/
  );

  return (
    <div>
      <Header />
      <NavigationBar />
      <br />
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <Typography variant="h3" style={{ fontWeight: 'bold',textAlign: "center" }}>All Orders</Typography>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
          <TextField
            style={{ width: "250px", marginRight: "10px" }}
            type="text"
            placeholder="Search Order ID,Status"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={downloadPDF} variant="contained" color="primary" style={{ width: "150px" }}>
            Order Report
          </Button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <Typography variant="body1" component="p" style={{ textAlign: "center" }}>
          No orders found.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
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
                    <div>
                      
                      <Button sx={{
                          backgroundColor: '#B61C1C', // Custom color for delete button
                          '&:hover': {
                            backgroundColor: '#E43B37', // Darker shade on hover
                          },
                        }} variant="contained" color="secondary" onClick={() => deleteHandler(order._id)} >
                        Delete Order
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderListPage;
