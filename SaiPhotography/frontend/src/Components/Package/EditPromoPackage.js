import React, { useEffect, useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navbar from './Navbar';

function EditAlbum() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [formData, setFormData] = useState({
    Package_Name: '',
    Amount: '',
    Description: '',
    Discount: '', // New state for discount percentage
    images: [],
  });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
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
    // Calculate the final amount based on the discount percentage
    let finalAmount = formData.Amount; // Initialize final amount with the entered amount
    if (formData.Discount) {
      const discount = parseFloat(formData.Discount); // Parse discount percentage to a float value
      if (!isNaN(discount) && discount > 0 && discount <= 100) { // Validate discount value
        finalAmount = parseFloat(formData.Amount) - (parseFloat(formData.Amount) * (discount / 100)); // Calculate final amount
      } else {
        alert('Please enter a valid discount percentage between 0 and 100.'); // Alert user for invalid discount
        return; // Exit function
      }
    }

    // Prepare data to send to the server
    const albumData = new FormData();
    albumData.append('Package_Name', formData.Package_Name);
    albumData.append('Amount', finalAmount); // Set final amount to send to the server
    albumData.append('Description', formData.Description);

    // Append images to FormData
    for (let i = 0; i < formData.images.length; i++) {
      albumData.append('images', formData.images[i]);
    }

    // Send data to the server based on whether it's an update or add operation
    if (selectedAlbum) {
      // Update album
      axios.put(`http://localhost:8070/promopackagesweb/update/${selectedAlbum._id}`, albumData)
        .then((response) => {
          if (response.status === 200) {
            console.log('Album updated successfully');
            setSelectedAlbum(null); 
            setFormData({
              Package_Name: '',
              Amount: '',
              Description: '',
              Discount: '', // Reset discount field
              images: [],
            });
            fetchAlbums(); // Fetch updated albums
          }
        })
        .catch((error) => {
          console.error('Error updating album:', error);
        });
    } else {
      // Add new album
      axios.post('http://localhost:8070/promopackagesweb/add', albumData)
        .then((_res) => {
          console.log('Package added successfully');
          alert('Package added successfully');
          setFormData({
            Package_Name: '',
            Amount: '',
            Description: '',
            Discount: '', // Reset discount field
            images: [],
          });
          fetchAlbums(); // Fetch updated albums
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const handleDeleteClick = (album) => {
    axios.delete(`http://localhost:8070/promopackagesweb/delete/${album._id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('Package deleted successfully');
          alert('Package deleted successfully');
          fetchAlbums(); // Fetch updated albums
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
      Discount: '', // Reset discount field
      images: album.images, 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    let yOffset = 10;

    albums.forEach((album) => {
      pdf.text(`Package Name: ${album.Package_Name}`, 10, yOffset);
      yOffset += 10;
      pdf.text(`Amount: ${album.Amount}`, 10, yOffset);
      yOffset += 10;
      pdf.text(`Description: ${album.Description}`, 10, yOffset);
      yOffset += 10;
      yOffset += 10; // Increase spacing between albums
    });

    pdf.save("album-details.pdf");
  };

  const fetchAlbums = () => {
    axios.get('http://localhost:8070/promopackagesweb/getdetail')
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });
  };

  return (
    
    <div style={{ backgroundColor: '#776551' }}>
      <Navbar/>
      <h1 style={{ marginBottom: '30px', color: "#DEB887", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: '25px' }}>
        EDIT PROMO PACKAGE
      </h1>
      <div className="form-container" style={{ backgroundColor: '#776551' }}>
        {/* <nav style={{ position: "absolute", top: "30px", right: "20px", zIndex: "1", display: "flex", alignItems: "center" }}>
          <a href="/Admindash" style={{ color: "white", marginLeft: "25px", marginRight: "20px", textDecoration: "none" }}>Back</a>
        </nav> */}
        <form>
          Package Name
          <input type="text" name="Package_Name" value={formData.Package_Name} onChange={handleChange} placeholder="Package Name" />
          Amount
          <input type="text" name="Amount" value={formData.Amount} onChange={handleChange} placeholder="Amount" />
          Description
          <input type="text" name="Description" value={formData.Description} onChange={handleChange} placeholder="Description" />
          Discount (%)
          <input type="text" name="Discount" value={formData.Discount} onChange={handleChange} placeholder="Discount (%)" /> {/* New field for discount percentage */}
          images
          <input type="file" name="images" onChange={handleImageChange} multiple />
          <div className="button-container">
            <button type="button" onClick={handleAddOrUpdateClick} className="btn btn-primary">
              {selectedAlbum ? 'Update Album' : 'Add Album'}
            </button>
            {selectedAlbum && (
              <button onClick={() => handleDeleteClick(selectedAlbum)} className="btn btn-danger">
                Delete
              </button>
            )}
            <button onClick={generatePDF} className="btn btn-success">
              Download PDF
            </button>
          </div>
        </form>
      </div>
      <div className="album-list" id="album-content">
        {albums.map((album) => (
          <div key={album._id} className="album-card">
            <h2>{album.Package_Name}</h2>
            <p>Amount: {album.Amount}</p>
            <p>Description: {album.Description}</p>
            <div className="image-list">
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
  );
}

export default EditAlbum;
