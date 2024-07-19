import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewOrder = () => {
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    orderId: "",
    customerId: "",
    productName: "", 
    products: [
      { productId: "", quantity: 1 },
    ],
    totalPrice: 0,
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...orderData.products];
    updatedProducts[index][name] = name === "quantity" ? parseInt(value, 10) : value;
    setOrderData((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
  };

  const addProduct = () => {
    setOrderData((prev) => ({
      ...prev,
      products: [...prev.products, { productId: "", quantity: 1 }],
    }));
  };

  const calculateTotalPrice = () => {
    return orderData.products.reduce(
      (acc, product) => acc + product.quantity * 10, // Example: fixed price of 10 per product
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPrice = calculateTotalPrice(); // Update total price before submission

    const dataToSend = {
      ...orderData,
      totalPrice,
    };

    try {
      await axios.post("http://localhost:5000/orders", dataToSend);
      alert("Order created successfully!");
      navigate("/cusorder"); // Redirect to orders list
    } catch (error) {
      console.error("Error creating order:", error);
      alert("An error occurred while creating the order.");
    }
  };

  return (
    <div>
      <h1>Create New Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID:</label>
          <input
            type="text"
            name="orderId"
            value={orderData.orderId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            name="customerId"
            value={orderData.customerId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Product Name:</label> {/* New product name field */}
          <input
            type="text"
            name="productName"
            value={orderData.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select name="status" value={orderData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <h3>Products</h3>
        {orderData.products.map((product, index) => (
          <div key={index}>
            <label>Product ID:</label>
            <input
              type="text"
              name="productId"
              value={product.productId}
              onChange={(e) => handleProductChange(index, e)}
              required
            />
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, e)}              min={1} 
              required
            />
          </div>
        ))}

        <button type="button" onClick={addProduct}>
          Add Product
        </button>

        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default NewOrder;
