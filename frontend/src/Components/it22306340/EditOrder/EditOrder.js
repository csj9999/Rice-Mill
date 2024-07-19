import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const OrderEditPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [order, setOrder] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

 
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/${id}`); 
        setOrder(response.data); 
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching order:", error);
        setIsLoading(false); 
      }
    };

    fetchOrder(); 
  }, [id]); 

  
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value })); 
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault(); 

    try {
      await axios.put(`http://localhost:5000/orders/${id}`, order); 
      navigate("/or"); 
    } catch (error) {
      console.error("Error updating order:", error); 
    }
  };

  if (isLoading) {
    return <p>Loading order details...</p>; 
  }

  if (!order) {
    return <p>Order not found.</p>; 
  }

  return (
    <div>
      <h1>Edit Order</h1>
      <form onSubmit={handleUpdate}> 
        <label>
          Order ID:
          <input
            type="text"
            name="orderId"
            value={order.orderId} 
            onChange={handleChange} 
          />
        </label>

        <label>
          Customer ID:
          <input
            type="text"
            name="customerId"
            value={order.customerId} 
            onChange={handleChange} 
          />
        </label>

        <label>
          Total Price:
          <input
            type="number"
            name="totalPrice"
            value={order.totalPrice} 
            onChange={handleChange} 
          />
        </label>

        <label>
          Order Date:
          <input
            type="date"
            name="orderDate"
            value={new Date(order.orderDate).toISOString().split("T")[0]}
            onChange={handleChange} 
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={order.status} 
            onChange={handleChange} 
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <button type="submit">Update Order</button> 
        <button type="button" onClick={() => navigate("/or")}> 
          Cancel
        </button>
      </form>
    </div>
  );
};

export default OrderEditPage; 
