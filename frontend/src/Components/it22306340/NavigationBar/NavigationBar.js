import React from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const NavigationBar = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuIcon className="MenuIcon" onClick={handleDrawerOpen} />

      <Drawer anchor={"left"} open={open} onClose={handleDrawerClose}>
        <div
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List>
            <ListItemButton component={Link} to="/pro">
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItemButton>

            <ListItemButton component={Link} to="/or">
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary="View User Orders" />
            </ListItemButton>

            <ListItemButton component={Link} to="/feed">
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary="View Feedbacks" />
            </ListItemButton>

            <ListItemButton component={Link} to="/issue-list">
              <ListItemIcon>
                <ReportProblemIcon />
              </ListItemIcon>
              <ListItemText primary="Reported Issues" />
            </ListItemButton>
          </List>
          <Divider />
          <List>{/* Additional list items can be added here */}</List>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationBar;
