import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import './Style/Home.css';
import Photographers from "./Components/Photographer/Pgrating";
import Footer from "./Components/Footer";
import Packages from "./Components/Packages";
import Header from "./Components/Header";

function Cusdash() {
  
  const navigate = useNavigate();
  const backgroundStyle = {
    background: `url('./Images/back3.jpg')`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    height: '600px', 
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };
  const navLinkStyle = {
    color: 'white',
    marginLeft: '25px',
    marginRight: '20px',
    textDecoration: 'none',
    fontWeight:'bold',
  };
  const footerStyle = {
    backgroundColor: "#5E503F",
    padding: "20px",
    color: "white",
    textAlign: "center",
  };
  
 

  const navContainerStyle = {
    position: 'absolute',
    top: '30px',
    right: '550px',
    zIndex: '1',
    display: 'flex',
    alignItems: 'center',
  };
 

  return (
    <div>
      <Header/>
      <div style={backgroundStyle}>
        <Packages/>
      </div>
      
      
    </div>
    
   
  );
}

export default Cusdash;
