import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "./logo.jpeg";

function cusHeader() {
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#002532" }}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ width: "100px", height: "auto", marginRight: "20px" }} />
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Rice Mill Management 
          </Typography>
          <div>
            <Link to="/main" style={{ textDecoration: "none" }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/userp" style={{ textDecoration: "none" }}>
              <Button color="inherit">Profile</Button>
            </Link>
            <Button color="inherit">Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default cusHeader;
