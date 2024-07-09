import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './../Style/Home.css';

function Gallery(){

  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8070/packagesweb/getdetails')
      .then((response) => {
        setAlbums(prevAlbums => [...prevAlbums, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });

    axios.get('http://localhost:8070/promopackagesweb/getdetail')
      .then((response) => {
        setAlbums(prevAlbums => [...prevAlbums, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching promo packages:', error);
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

  // Filter albums based on search query
  const filteredAlbums = albums.filter(album =>
    album.Package_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={contentStyle}>
        <div>
          <div style={{color:'white', marginLeft : "45px", marginBottom:"15px"}}>
            <h3>Packages</h3>
            {/* Search bar */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by package name"
              className="form-control"
              style={{ marginBottom: '15px' }}
            />
          </div>
          <div className="row">
            {filteredAlbums.map((album) => (
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
                      <div className="btn-group">
                        <Link
                          to={`/booking/${album._id}`}
                          className="btn btn-sm btn-outline-secondary"
                        >Select
                        </Link>
                      </div>
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
    </div>
  );
}

export default Gallery;
