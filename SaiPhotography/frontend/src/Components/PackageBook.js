import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Modal, Button } from 'react-bootstrap';
import { DateRange } from "react-date-range";
import axios from "axios";
import Footer from "./Footer";
import "./../Style/ListingDetails.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Header from "./Header2.js";
import Payment from "./Payment/paymentgateway.js"; 

function ListingDetails() {
  const { albumId } = useParams();
  const navigate = useNavigate(); // Import and use useNavigate hook
  const [albumData, setAlbumData] = useState({ Package_Name: '', Amount: '', Description: '' });
  const [photos, setPhotos] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Mobile_No, setMobile] = useState('');
  const [dateValidity, setDate] = useState('');
  const [Message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [payment, submitPayment] = useState(null);
  const [mobileError, setMobileError] = useState(null); // State variable for phone number validation error

  useEffect(() => {
    if (albumId) {
      axios.get(`http://localhost:8070/packagesweb/get/${albumId}`)
        .then((response) => {
          setAlbumData(response.data.album);
          setPhotos(response.data.album.images);
        })
        .catch((error) => {
          console.error('Error fetching album data and photos:', error);
        });
    }
  }, [albumId]);
  
  const handleFeedbackModalOpen = () => {
    setShowFeedbackModal(true);
  };

  const handlePaymentModalClose = () => {
    setShowFeedbackModal(false);
  };

  const handleSelect = (ranges) => {
    const selectedStartDate = ranges.selection.startDate;
    const today = new Date();

    if (selectedStartDate < today) {
      alert("Please select a future date for booking.");
    } else {
      setDateRange([ranges.selection]);
      setDate(selectedStartDate.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Phone number validation
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!phoneNumberPattern.test(Mobile_No)) {
      setMobileError('Please enter a valid 10-digit phone number.');
      return;
    } else {
      setMobileError(null);
    }
  
    const isDateAvailable = await checkDateAvailability();
  
    if (!isDateAvailable) {
      setError('This date is already booked. Please choose another date.');
      return;
    }
  
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
        setBookingSubmitted(true);
        setShowFeedbackModal(true); 
        console.log('Detail added', response.data);
       
        const { bookingId } = response.data;
       
        setBookingId(bookingId);
       
        await submitPayment(bookingId); 
       
       
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
      return !response.data.exists;
    } catch (error) {
      console.error('Error checking date availability:', error);
      return true;
    }
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };
  
  const containerStyle = {
    marginTop: '30px',
    marginBottom: '100px',
    width: '500px',
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
  const headerStyle = {
    color: '#176B87',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    fontWeight: 'bold'
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
      <Header/>
      <div className="container mt-5" >
        <div className="title">
          <h3 style={headerStyle}>{albumData.Package_Name}</h3>
          <div></div>
        </div>

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

        <hr />

        <h3>Description</h3>
        <p>{albumData.Description}</p>
        <hr />

        <h3>Amount</h3>
        <p>{albumData.Amount}</p>
        <hr />
        <div className="container mt-5" style={{ ...cardStyle ,backgroundColor: '#C6ACAC', boxShadow: '0.6px 0.2px 59.7px rgba(0, 0, 0, 0.033), 1.5px 0.6px 112.8px rgba(0, 0, 0, 0.07), 3px 1.2px 163.9px rgba(0, 0, 0, 0.111), 6.2px 2.6px 234px rgba(0, 0, 0, 0.156), 17px 7px 500px rgba(0, 0, 0, 0.2)',}}>
        <div style={containerStyle}>
          <form style={formStyle} onSubmit={handleSubmit}>
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
              {mobileError && <div style={errorStyle}>{mobileError}</div>} {/* Display phone number validation error */}
            </div>
            <div className="container mt-5 shadow-sm">
            <div>
              <h2>What's the date you select?</h2>
              <div className="date-range-calendar">
                <DateRange ranges={dateRange} onChange={handleSelect} />
                <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              </div>
            </div>
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

            <h2>Total price: {albumData.Amount}/=</h2>

            {error && <div style={errorStyle}>{error}</div>}

            {bookingSubmitted ? null : (
              <div className="text-center">
                <button type="submit" className="btn btn-primary" style={buttonStyle}>BOOK</button>
              </div>
            )}

            {bookingSubmitted && !paymentCompleted && (
              <div className="text-center">
                <Modal show={showFeedbackModal} onHide={handlePaymentModalClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Payment Gateway</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* Pass bookingId as prop to Payment component */}
                    <Payment bookingId={bookingId} />
                  </Modal.Body>
                </Modal>
              </div>
            )}

            {paymentCompleted && (
              <div className="text-center">
                <p>Payment completed!</p>
              </div>
            )}

          </form>
        </div>
        </div>
        </div>
        <Footer />
      </div>
    
  );
}

export default ListingDetails;
