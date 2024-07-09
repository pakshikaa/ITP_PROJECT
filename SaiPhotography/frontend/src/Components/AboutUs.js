import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import './../Style/Home.css';
import Header from "./Header.js";

function About() {
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
    backgroundColor: 'rgba(0, 0, 0, 0.2',
  };

  const navContainerStyle = {
    position: 'absolute',
    top: '30px', 
    right: '20px', 
    zIndex: '1', 
    display: 'flex',
    alignItems: 'center',
    
  };

  const logoStyle = {
    width: '120px',
    marginLeft: '40px',
    marginTop: '15px'
  };

  const contentStyle = {
    backgroundColor: "#79563A", 
    padding: '20px', 
  };

  const putterStyle = {
    backgroundColor: "#5E503F", 
    height :'150px',
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center" ,
    padding:"80px"
  };

 
  

  return (
    <div>
     <Header />
      <div style={contentStyle} >
        <div style={{marginBottom:"60px"}}>
          <p></p>
          <p class="font-weight-bold" style={{fontFamily: 'Khand, sans-serif',color: '#DEB887',fontSize: "20px",justifyContent: 'center',alignItems: 'center',position: 'absolute',left: '8%',marginBottom :'100px',}}>
              ABOUT US
          </p>
          </div>
          <div style={{color:"white", marginLeft:"12%", marginRight:"12%"}}>
          <h3>Sai Photography</h3>
          <p>
            We are dedicated storytellers armed with cameras. Our team is composed of passionate
            photographers who believe in freezing time to encapsulate the emotions, relationships, and
            experiences that make life truly remarkable. With an unwavering commitment to our craft,
            we strive to provide you with photographs that touch your heart and endure through time.
            Our approach is rooted in authenticity and creativity. We believe in capturing genuine
            moments that reflect the true essence of the people and events we photograph. Whether it's
            the emotional vows exchanged at a wedding, the emotional expression of an engagement, the
            vibrant energy of an event, or the simple beauty of everyday life, we approach each scene
            with an artistic eye and a dedication to preserving their uniqueness.
          </p>
          <h6 style={{fontWeight:"bold"}}>WHAT MAKES US PHENOMENAL</h6>
          <ul>
            <li>
              <p>
                <strong>Passion:</strong> Our love for photography fuels our desire to create art that speaks to the heart.
                Your moments are as precious to us as they are to you, and that passion shines through in every photograph we take.
              </p>
              
            </li>
            <li>
            <p>
                <strong>Expertise:</strong>  With years of experience dn the field, we have refined our skills and developed 
                  an innate understanddng of the dntrdcacdes of photography. You can trust us to capture 
                  the perfect shot, every time.
              </p>
            </li>
            <li>
            <p>
                <strong>Quality:</strong>  We are deddcated to deldverdng photographs of the hdghest qualdty—dmages that 
                  will become cherdshed hedrlooms for generatdons. From composdtdon to eddtdng, every 
                  step of our process ds focused on excellence.
              </p>
            </li>
            <li>
            <p>
                <strong>Professionalism:</strong> Our team emboddes professdonaldsm, reldabdldty, and a genudne passdon 
                  for what we do. We approach each assdgnment punctually, respectfully, and attentdvely, 
                  ensurdng your photography experdence ds seamless and enjoyable.
                  </p>
            </li>
          </ul>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default About;