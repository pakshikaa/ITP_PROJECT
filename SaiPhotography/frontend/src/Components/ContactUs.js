import React, { useState, useEffect } from "react";
import './../Style/Home.css';
import Header from "./Header.js";
import Footer from "./Footer";

function ContactUs(){

      const contentStyle = {
        backgroundColor: "#A38469", 
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
    
 


      
    return(
        <div>
         <Header />
      
        <div style={contentStyle} >
        <div style={{ marginBottom:"60px"}}>
          <p></p>
          <p class="font-weight-bold" style={{fontFamily: 'Khand, sans-serif',color: '#DEB887',fontSize: "25px",justifyContent: 'center',alignItems: 'center',position: 'absolute',left:'40%',marginBottom :'250px',}}>
           TO REACH US
          </p>
          </div>
          <div >
            <form style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop:"75px"}}>
            <div style={{color:"white",fontSize:"18px", marginLeft:"18%", marginRight:"12%"}}>
          <h5>EMAIL</h5>
          <p style={{ textDecoration: "underline", color: "black" , marginBottom:'40px' }}>saiphotography@gmail.com</p>
          <h5>HOT LINE</h5>
          <p style={{ textDecoration: "underline", color: "black" , marginBottom:'40px'}}>+94768000711</p>
          <h5>LOCATION</h5>
          <p style={{ color: "black" }}>SAI PHOTOGRAPHY</p>
          <p style={{  color: "black" }}>GALLE ROAD</p>
          <p style={{ color: "black" , marginBottom:'40px' }}>MALABE</p>
          <h5>FOLLOW US</h5>
          <p style={{ textDecoration: "underline", color: "black"}}>www.facebook.com/saiphotography</p>
          <p style={{ textDecoration: "underline", color: "black", marginBottom:'40px' }}>www.instagram.com/saiphotography</p>
        </div>
        <p style={{ color: "white" ,fontSize:"18px"}}>You have to login to find out more about our services! Please call us with any questions, or send us a message.</p>
            </form>
        </div>
      </div>

      <div style={putterStyle}>
        <hr/>
        
      </div>
      <Footer/>
    </div>
  );
}
        

export default ContactUs;
