import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';


function EditAlbum() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [formData, setFormData] = useState({
    Package_Name: '',
    Amount: '',
    Description: '',
    images: [],
  });

  
  useEffect(() => {
    axios.get('http://localhost:8070/packagesweb/getdetails')
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'Amount') {
     
      if (!/^\d*\.?\d*$/.test(value)) {
       
        return;
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const images = event.target.files;
    const newImages = Array.from(images); 
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages], 
    });
  };
  

  const handleAddOrUpdateClick = () => {
    if (!formData.Package_Name || !formData.Amount || !formData.Description || formData.images.length === 0) {
      alert('Please fill in all fields ');
      return;
    }
    
    if (selectedAlbum) {
      axios.put(`http://localhost:8070/packagesweb/update/${selectedAlbum._id}`, formData)
        .then((response) => {
          if (response.status === 200) {
            console.log('Album updated successfully');
            setSelectedAlbum(null); 
            setFormData({
              Package_Name: '',
              Amount: '',
              Description: '',
              images: [],
            });
            
            axios.get('http://localhost:8070/packagesweb/getdetails')
              .then((response) => {
                setAlbums(response.data);
              })
              .catch((error) => {
                console.error('Error fetching albums:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error updating album:', error);
        });
    }
    
    else {
      const albumData = new FormData();
      albumData.append('Package_Name', formData.Package_Name);
      albumData.append('Amount', formData.Amount);
      albumData.append('Description', formData.Description);

      for (let i = 0; i < formData.images.length; i++) {
        albumData.append('images', formData.images[i]);
      }

      axios
        .post('http://localhost:8070/packagesweb/add', albumData)
        .then((_res) => {
          console.log('Package added successfully');
          alert('Package added successfully');
          axios.get('http://localhost:8070/packagesweb/getdetails')
            .then((response) => {
              setAlbums(response.data);
            })
            .catch((error) => {
              console.error('Error fetching albums:', error);
            });
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const handleDeleteClick = (album) => {
    axios.delete(`http://localhost:8070/packagesweb/delete/${album._id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('package deleted successfully');
          alert('package deleted successfully');
          axios.get('http://localhost:8070/packagesweb/getdetails')
            .then((response) => {
              setAlbums(response.data);
            })
            .catch((error) => {
              console.error('Error fetching package:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error deleting album:', error);
      });
  };

  const handleEditClick = (album) => {
    setSelectedAlbum(album);
    setFormData({
      Package_Name: album.Package_Name,
      Amount: album.Amount,
      Description: album.Description,
      images: album.images, 
    });
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  

  return (
    <div>
     
    <div style={{backgroundColor:'#776551'}}>
    <Navbar/>
      <h1 style={{marginBottom:'30px', color:"#DEB887", display: "flex", flexDirection: "column", alignItems: "center" , paddingTop:'25px'}}>
        EDIT STANDARD PACKAGE</h1>
        <div className="form-container" style={{backgroundColor:'#776551'}}>

        {/* <nav style={{ position: "absolute", top: "30px", right: "20px", zIndex: "1", display: "flex", alignItems: "center" }}>
              <a href="/Admindash" style={{ color: "white", marginLeft: "25px", marginRight: "20px", textDecoration: "none" }}>Back</a>
        </nav> */}
      <form >

      <div className="form-group">
        <label htmlFor="Album_Category">Package_Name</label>
        <input
          type="text"
          id="Package_Name"
          name="Package_Name"
          value={formData.Package_Name}
          onChange={handleChange}
          placeholder="Enter Package Name"
          className="form-control"
        />
      </div>

  <div className="form-group">
    <label htmlFor="Name">Amount</label>
    <input
      type="text"
      id="Amount"
      name="Amount"
      value={formData.Amount}
      onChange={handleChange}
      placeholder="Enter Amount"
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label htmlFor="Description">Description</label>
    <input
      type="text"
      id="Description"
      name="Description"
      value={formData.Description}
      onChange={handleChange}
      placeholder="Enter Package Description"
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label htmlFor="images">Package Images</label>
    <input
      type="file"
      id="images"
      name="images"
      accept="image/*"
      
      onChange={handleImageChange}
      className="form-control-file"
    />
  </div>

  {formData.images.length > 0 && (
    <div>
      <h6>Selected Images:</h6>
      <ul>
        {formData.images.map((image, index) => (
          <li key={index}>{image.name}</li>
        ))}
      </ul>
    </div>
  )}

  <div className="button-container">
    <button type="button" onClick={handleAddOrUpdateClick} className="btn btn-primary">
      {selectedAlbum ? 'Update Album' : 'Add Album'}
    </button>
    {selectedAlbum && (
      <button onClick={() => handleDeleteClick(selectedAlbum)} className="btn btn-danger">
        Delete
      </button>
    )}
  </div>
</form>

    </div>
      <div className="album-list">
        {albums.map((album) => (
          <div key={album._id} className="album-card">
            <h2>{album.Package_Name}</h2>
            <p>Amount: {album.Amount}</p>
            <p>Description: {album.Description}</p>
            <div className="image-list" >
              {album.images.map((image, _index) => (
                <img
                  key={image.filename}
                  src={`http://localhost:8070/uploads/${image.filename}`}
                  alt={image.filename}
                />
              ))}
            </div>
            <button onClick={() => handleEditClick(album)}>Update</button>
            <button onClick={() => handleDeleteClick(album)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
    </div>
);
}

export default EditAlbum;
