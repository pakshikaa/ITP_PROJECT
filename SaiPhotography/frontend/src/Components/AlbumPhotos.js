import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './../Style/Home.css';

function AlbumPhotos() {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState({ Package_Name: '', Amount: '', Description: '' });
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8070/packagesweb/get/${albumId}`)
      .then((response) => {
        setAlbumData(response.data.photographer);
        setPhotos(response.data.photographer.images);
      })
      .catch((error) => {
        console.error('Error fetching album data and photos:', error);
      });
  }, [albumId]);

  const navLinkStyle = {
    color: 'white',
    marginLeft: '25px',
    marginRight: '20px',
    textDecoration: 'none',
  };



  return (
    <div>
      <div style={{backgroundColor:'#6c584c'}}>
      <nav style={{ position: "absolute", top: "30px", right: "20px", zIndex: "1", display: "flex", alignItems: "center" }}>
                <a href="/package" style={{ color: "white", marginLeft: "25px", marginRight: "20px", textDecoration: "none" }}>Back</a>
            </nav>
          <div style={{marginLeft:'100px', marginRight:'100px', paddingTop:'60px'}}>
            <p style={{display: "flex", flexDirection: "column", alignItems: "center" ,fontSize:'35px',fontWeight:'bold',fontFamily: 'Khand, sans-serif',color:'#DEB887'}}> {albumData.Package_Name}</p>
            <p style={{color:'white', fontSize:'25px', fontWeight:'bold'}}> {albumData.Amount}</p>
            <p style={{color:'white', fontSize:'18px'}}>{albumData.Description}</p>
            <p  style={{color:'white', fontSize:'18px', marginBottom:'50px'}}>All Rights Reserved by Evora Moments Photography © 2023</p>
            <div className="row">
              {photos.map((photo) => (
                <div className="col-md-3" key={photo.filename}>
                  <div className="card mb-3 shadow-sm">
                    <img
                      src={`http://localhost:8070/uploads/${photo.filename}`}
                      alt={photo.filename}
                      className="card-img-top"
                      style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}

export default AlbumPhotos;
