import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../it22306340/contexts/AuthContext';
import axios from 'axios';
import { TextField, Button, Typography, Card, CardContent, CardActions, Grid, IconButton, Avatar, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Search as SearchIcon, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import NavBar from './Navbar';

function CusHome() {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [units, setUnits] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProfileClick = () => {
    navigate(`/userp/${loggedInUser._id}`);
  };

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleUnitChange = (productId, unit) => {
    setUnits((prevUnits) => ({
      ...prevUnits,
      [productId]: unit,
    }));
  };

  const handleOrder = async (productId, quantity, unit, productItem) => {
    try {
      if (quantity > 0) {
        // Store selected unit and quantity in local storage
        localStorage.setItem(productId, JSON.stringify({ title: productItem.title, price: productItem.price, quantity, unit }));
        
        // Redirect to cart page after placing the order
        navigate("/cart");
      } else {
        console.log("Quantity should be greater than 0 to place an order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    const filteredProducts = data.filter(product =>
      product.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
      product.description.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredData(filteredProducts);
  };

  return (
    <div>
      <NavBar></NavBar>
      <Button onClick={handleProfileClick}>Profile</Button>
      <Grid container spacing={2}>
        {/* Search input */}
        <Grid item xs={12}>
          <TextField 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        {filteredData.length > 0 ? (
          filteredData.map((productItem, productIndex) => (
            <Grid item xs={12} sm={6} md={4} key={productIndex}>
              <Card>
                <CardContent>
                  <div className="image" onClick={() => handleImageClick(productItem._id)}>
                    <Avatar alt={productItem.title} src={productItem.image} 
                      variant="rounded" sx={{ width: 120, height: 120, cursor: 'pointer' }} />
                  </div>
                  <Typography variant="h6" component="div" className="title">{productItem.title}</Typography>
                  <Typography variant="body2" component="div" className="description">{productItem.description}</Typography>
                  <Typography variant="body1" component="div" className="price">Rs {productItem.price} (1kg)</Typography>
                  <div className="quantity">
                    <IconButton onClick={() => handleQuantityChange(productItem._id, (quantities[productItem._id] || 0) - 1)}>
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      type="number"
                      value={quantities[productItem._id] || 0}
                      onChange={(e) => handleQuantityChange(productItem._id, parseInt(e.target.value))}
                      inputProps={{ style: { textAlign: 'center' } }}
                      style={{ width: 90 }}
                    />
                    <IconButton onClick={() => handleQuantityChange(productItem._id, (quantities[productItem._id] || 0) + 1)}>
                      <AddIcon />
                    </IconButton>
                    <FormControl style={{ marginLeft: 10 }}>
                      <InputLabel>Unit</InputLabel>
                      <Select
                        value={units[productItem._id] || ""}
                        onChange={(e) => handleUnitChange(productItem._id, e.target.value)}
                        style={{ minWidth: 100 }}
                      >
                        <MenuItem value="">Select Unit</MenuItem>
                        <MenuItem value="5kg">5kg</MenuItem>
                        <MenuItem value="10kg">10kg</MenuItem>
                        <MenuItem value="20kg">20kg</MenuItem>
                        <MenuItem value="25kg">25kg</MenuItem>
                        <MenuItem value="50kg">50kg</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleOrder(productItem._id, quantities[productItem._id] || 0, units[productItem._id], productItem)} variant="contained">Order</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No Data Found</Typography>
        )}
      </Grid>
    </div>
  );
}

export default CusHome;
