import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function AddNewDetail() {
  const { albumId } = useParams();
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Mobile_No, setMobile] = useState('');
  const [dateValidity, setDate] = useState('');
  const [Message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [albumData, setAlbumData] = useState({ Package_Name: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (albumId) {
      axios.get(`http://localhost:8070/packagesweb/get/${albumId}`)
        .then((response) => {
          setAlbumData(response.data.album);
        })
        .catch((error) => {
          console.error('Error fetching album data:', error);
        });
    }
  }, [albumId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the date is already booked
    const isDateAvailable = await checkDateAvailability();

    if (!isDateAvailable) {
      setError('This date is already booked. Please choose another date.');
      return;
    }

    // If the date is available, proceed to add the detail
    const detail = {
      Name,
      Email,
      Mobile_No,
      dateValidity,
      Message,
      Package_Name: albumData?.Package_Name
    };

    try {
      const response = await axios.post('http://localhost:8070/Bookingdetail/addDetails', detail);
      if (response && response.status === 200) {
        setName('');
        setEmail('');
        setMobile('');
        setDate('');
        setMessage('');
        setAlbumData('');
        setError(null);
        console.log('Detail added', response.data);
        alert('Detail added successfully!');
      } else {
        console.error('Invalid response received:', response);
        setError('An error occurred while adding detail');
      }
    } catch (error) {
      console.error('Error adding detail:', error);
      setError('An error occurred while adding detail');
    }
  };

  const checkDateAvailability = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/Bookingdetail/checkAvailability/${dateValidity}`);
      return !response.data.exists; // If exists is true, date is already booked
    } catch (error) {
      console.error('Error checking date availability:', error);
      return true; // Assume date is available in case of error
    }
  };

  const backgroundStyle = {
    display: "flex",
    justifyContent: "space-between",
    background: `url('./Images/1.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    height: "auto",
    textAlign: "center", 
  };

  const containerStyle = {
    marginTop:'30px',
    marginBottom: '100px',
    width: '500px',
    backgroundColor: "GrayText",
    margin: "0 auto", 
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
   
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
  };

  const buttonStyle = {
    width: "150px",
    padding: "10px",
    marginRight: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  };

  const errorStyle = {
    color: "red",
    marginBottom: "15px",
  };

  const packageNameStyle = {
    alignItems: "center",
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'Khand, sans-serif',
    color: '#DEB887',
    marginBottom: '20px'
  };

  return (
    <div style={backgroundStyle}>
      <div  style={containerStyle}>
        <div style={containerStyle} >
          
          <form style={formStyle}  onSubmit={handleSubmit}>
            <h2 style={{ color: '#DEB887' }}>Package Booking</h2>

            <div className="form-group">
              <label htmlFor="nameInput">Your Name :</label>
              <input
                type="text"
                id="nameInput"
                placeholder="Enter Your Name"
                value={Name}
                onChange={(event) => setName(event.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailInput">Email :</label>
              <input
                type="email"
                placeholder="Enter email"
                id="emailInput"
                value={Email}
                onChange={(event) => setEmail(event.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileInput">Mobile No :</label>
              <input
                type="number"
                placeholder="Enter the Mobile Number"
                id="mobileInput"
                value={Mobile_No}
                onChange={(event) => setMobile(event.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subjectInput">Date :</label>
              <input
                type="date"
                placeholder="Enter the event date"
                id="subjectInput"
                value={dateValidity}
                onChange={(event) => setDate(event.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="messageInput">Message :</label>
              <input
                type="text"
                placeholder="Enter Your Message"
                id="messageInput"
                value={Message}
                onChange={(event) => setMessage(event.target.value)}
                style={inputStyle}
              />
            </div>

            {error && <div style={errorStyle}>{error}</div>}

            <div className="text-center">
              <button type="submit" style={buttonStyle}>BOOK</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewDetail;
