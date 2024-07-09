import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import './../Style/Home.css';
import Header from "./Header.js";

function Home() {
  const navLinkStyle = {
    color: 'white',
    marginLeft: '25px',
    marginRight: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const overlayStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };

  const navContainerStyle = {
    position: 'absolute',
    top: '30px',
    right: '20px',
    zIndex: '1',
    display: 'flex',
    alignItems: 'center',
  };

  const contentContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "10%",
    transform: "translateY(-50%)",
  };

  const logoStyle = {
    width: '120px',
    marginLeft: '40px',
    marginTop: '15px'
  };

  const contentStyle = {
    
    padding: '20px',
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginTop: "20px",
  };

  const boxStyle = {
    backgroundColor: "#e6ccb2",
    padding: "20px",
    boxShadow: '3px 1.2px 4.7px rgba(0, 0, 0, 0.061), 4.7px 1.9px 13.5px rgba(0, 0, 0, 0.121), 6.1px 2.5px 29.1px rgba(0, 0, 0, 0.189), 7.8px 3.2px 58.7px rgba(0, 0, 0, 0.271), 10.2px 4.2px 127.9px rgba(0, 0, 0, 0.363), 17px 7px 500px rgba(0, 0, 0, 0.46)',
  };
  const backgroundStyle = {
    backgroundImage: `url('/Images/pink.jpg')`, // Ensure the correct path to the image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };
  



  return (
    <div className="background" style={backgroundStyle}>
      <Header />
      <div style={contentContainerStyle}>
        <form style={{ width: "300px", fontSize: "40px", fontWeight: "bold", color: "white" }}>
          <p>Capture pure romantic moments of love story now and forever</p>
        </form>
      </div>

      <div style={contentStyle}>
        <div style={{ marginBottom: "60px" }}>
          <p></p>
          <p className="font-weight-bold" style={{ fontFamily: 'Khand, sans-serif', color: '#DEB887', fontSize: "40px", justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '44%', marginBottom: '100px', }}>
            OVERVIEW
          </p>
          <br></br>
        </div>

        <div style={{ marginLeft: '12%', marginRight: "12%" }}>
          <div style={gridContainerStyle}>

            <div style={boxStyle} >
              <h1 style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px" }}>WEDDING SHOOTS</h1>
              <p>Many of us have a story to tell and with our wedding photography, we can tell your story for years to come. We’ll help you preserve the details, moments, and emotions.</p>
            </div>


            <div style={boxStyle}>
              <h1 style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px" }}>ENGAGEMENTS</h1>
              <p>Engagements are a unique way to capture the love between two people. Capturing the emotions of the moment and freezing them in time is what engagement photography is all about.</p>
            </div>


            <div style={boxStyle}>
              <h1 style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px" }}>CASUAL SHOOTS</h1>
              <p>Casual shoots are a great way to get comfortable in front of the camera and to get some practice in. We do offer casual shoots and they are a great way to get started.</p>
            </div>


            <div style={boxStyle}>
              <h1 style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px" }}>EVENTS</h1>
              <p>Whether it s a corporate gathering or a milestone celebration, our event photography preserves the atmosphere and energy of the occasion.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
