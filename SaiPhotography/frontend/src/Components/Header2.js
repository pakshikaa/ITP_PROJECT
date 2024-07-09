import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import './../Style/Home.css';

function Home() {
  const { user, setUser } = useContext(UserContext); // Access user state and setUser function from context
  const [showDropdown, setShowDropdown] = useState(false); 
  const navLinkStyle = {
    color: 'white',
    marginLeft: '25px',
    marginRight: '20px',
    textDecoration: 'none',
    fontWeight:'bold',
    position: 'relative',
  };
 
 

  const navContainerStyle = {
    position: 'absolute',
    top: '30px',
    right: '20px',
    zIndex: '1',
    display: 'flex',
    alignItems: 'center',
  };
  
  const headerStyle = {
   
    backgroundSize: "cover",
    backgroundPosition: "center",
    position:"relative",
    height: "100px",
  };
  const overlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

 
  const logoStyle = {
    width: '120px',
    marginLeft: '40px',
    marginTop: '15px'
  };
  const handleHovers = (e) => {
    e.target.style.color = "-webkit-linear-gradient(45deg, #fff, #A38469)";
    e.target.style.textDecoration = "underline";
    e.target.style.fontWeight = "bold";
    
  };

  const handleHover = (e) => {
    e.target.style.textDecoration = 'none';
    e.target.style.color = "#A38469";

    if (e.target.classList.contains('login-box')) {
      e.target.style.backgroundColor = "#FFFFFF"; // Change to the desired hover color
    }
  };

  const handleHoverExit = (e) => {
    e.target.style.textDecoration = 'none';
    e.target.style.color = "white";

    if (e.target.classList.contains('login-box')) {
      e.target.style.backgroundColor = "#A38469"; // Change to the desired hover color
    }
  };

  const handleLogout = () => {
    // Clear username from localStorage
    localStorage.removeItem('username');
    // Clear user from context
    setUser(null);
  };

  const username = localStorage.getItem('username');

  const handleUsernameClick = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown menu display
  };

  // Function to handle login
  const handleLogin = () => {
    // Set hasLoggedIn state to true
    localStorage.setItem('username', 'username'); // Set dummy username
    setUser('username'); // Set dummy user
  };

  return (
    <div>
      
      <header style={headerStyle}>
        <div style={overlayStyle}></div>
        <div className="left" >
          <img
            src="./Images/Sai4.png"
            style={logoStyle}
            className="nav-image"
            alt="Logo"
          />
            
          <nav style={navContainerStyle}>
            <a href="/" style={navLinkStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverExit}>
              Home
            </a>
            <a href="/about" style={navLinkStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverExit}>
              About Us
            </a>
            <a href="/gallery" style={navLinkStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverExit}>
              Galleries
            </a>

            <a href="/contact" style={navLinkStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverExit}>
              Contact Us
            </a>
            <div style={{ position: 'relative' }}>
              <a className="text-white  p-3 rounded-pill fw-bold text-center"
                onMouseEnter={handleHover} onMouseLeave={handleHoverExit} onClick={handleUsernameClick}
               style={{
 
                    backgroundColor: "#A38469",
                    borderRadius: "20px",
                    paddingLeft: "12px",
                    paddingTop: '2px',
                    fontWeight: "bolder",
                    textAlign: "center", // Align text to center
                    display: "flex", // Flex display
                    flexDirection: "column", // Stack items vertically
                    justifyContent: "center", // Center items vertically
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add box shadow
                    }}>
                {username}
              </a>
              {showDropdown && (
               <div onMouseEnter={handleHover} style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' }}>
                   <Link to="/profile" className="dropdown-item">User Profile</Link>
                   <Link to=""className="dropdown-item" onClick={handleLogout} key="logout">Logout</Link>
             </div>
            )}      
               </div>

            {/* Render "Connect" button if the user is not logged in */}
            {!user && (
              <Link to="/connect" style={navLinkStyle} onMouseEnter={handleHover} onMouseLeave={handleHoverExit} onClick={handleLogin}>
                <div className="login-box" style={{ height: "30px", width: "95px", color: "white", backgroundColor: "#A38469", justifyContent: "center", borderRadius: "5px", paddingLeft: "12px", paddingTop: '2px', fontWeight:"bolder" }}>
                  Connect
                </div>
              </Link>
            )}
            

            
          </nav>
          
        </div>
      </header>
    </div>
  )
}

export default Home;
