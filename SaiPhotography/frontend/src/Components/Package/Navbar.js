import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import HomeIcon from "@mui/icons-material/Home";
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">PACKAGE MANAGEMENT OF SAI PHOTOGRAPHY</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                
              <li className="nav-item">
              <NavLink className="nav-link "  exact to="/editPromo" activeClassName="active">Add Promo Package </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link "  exact to="/editalbum" activeClassName="active">Add Standard Package </NavLink>
            </li>
           <li className="nav-item">
              <ListItemButton component={Link} to="/AdminDashboard">
                <ListItemIcon style={{ backgroundColor: "#E5E5E5" }}>
                  <HomeIcon color={location.pathname === "/AdminDashboard" ? 'primary' : 'inherit'}  />
                </ListItemIcon>
                <ListItemText primary="Admin Panel" />
              </ListItemButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar