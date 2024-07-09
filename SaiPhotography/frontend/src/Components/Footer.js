import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import './../Style/Home.css';

function Footer() {
  const footerStyle = {
    
    padding: "40px",
    color: "black",
    textAlign: "center",
  };

  const logoStyle = {
    display: "inline-block",
    marginRight: "20px",
  };

  const linkStyle = {
    color: "black",
    textDecoration: "none",
    marginRight: "10px",
  };

  return (
    <footer style={footerStyle}>
      <div>
        <div style={logoStyle}>
          <img src="./Images/Sai4.png" alt="Company Logo" height="30" />
        </div>
        <div style={{ display: "inline-block" }}>
          <a href="/about" style={linkStyle}>About Us</a>
          <a href="/contact" style={linkStyle}>Contact Us</a>
          <a href="/gallery" style={linkStyle}>Gallery</a>
          <a href="/connect" style={linkStyle}>Connect</a>
          
        </div>
        <div style={{ float: "left"}}>
          <p></p>
          
        </div>
        <div style={{ float: "right" }}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={linkStyle}><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={linkStyle}><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={linkStyle}><FontAwesomeIcon icon={faTwitter} /></a>
        </div>
      </div>
      <hr />
      
    </footer>
  );
}

export default Footer;
