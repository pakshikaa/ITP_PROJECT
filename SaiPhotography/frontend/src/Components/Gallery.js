import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../Style/Home.css';
import Header from "./Header.js";
import Footer from "./Footer";

function Gallery(){

  const [albums, setAlbums] = useState([]);

    useEffect(() => {
    
    axios.get('http://localhost:8070/packagesweb/getdetails')
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
    }, []);
      
    const contentStyle = {
      backgroundColor: "#776551", 
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
      <div>
      <Header />
            </div>
            <div style={contentStyle} >
              <div style={{marginBottom:"60px"}}>
                <p></p>
                <p class="font-weight-bold" style={{fontFamily: 'Khand, sans-serif',color: '#DEB887',fontSize: "20px",justifyContent: 'center',alignItems: 'center',position: 'absolute',left: '8%',marginBottom :'100px',}}>
                  PORTFOLIO
                </p>
              </div>
            <div >
          <div style={{color:'white', marginLeft : "45px", marginBottom:"15px"}}>
          <h3>PACKAGE GALLERY</h3>
          </div>
          <div className="row">
            {albums.map((album) => (
              <div className="col-md-3" key={album._id} style={{ marginBottom: "20px" }}>
                <div
                  className="card mb-3 shadow-sm"
                  style={{height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white', 
                    boxShadow: 'none',}}>
                  {album.images && album.images.length > 0 && (
                    <img
                      src={`http://localhost:8070/uploads/${album.images[0].filename}`}
                      alt={album.images[0].filename}
                      className="card-img-top"
                      style={{ objectFit: 'cover', height: '75%', width: '100%' }}
                    />
                  )}
                  <div className="card-body" >
                    <h3 className="card-title">{album.Package_Name}</h3>
                    <p className="card-text" > {album.Amount}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={putterStyle}>
        <hr/>
      
      </div>
      <Footer/>
    </div>
  );
}

export default Gallery;