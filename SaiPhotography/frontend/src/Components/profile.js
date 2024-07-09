import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Photographers from "./Photographer/Pgrating";
import Footer from "./Footer";
import Header from "./Header2.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit,FaSave,FaTimes} from "react-icons/fa";
import { MdCancelPresentation } from "react-icons/md";

const Profile = () => {
  const [userBooking, setUserBooking] = useState(null);
  const [updatedBookingData, setUpdatedBookingData] = useState({});
  const [userPayments, setUserPayments] = useState([]);
  const [updatedPaymentData, setUpdatedPaymentData] = useState({});


  useEffect(() => {
    const getUserBooking = async () => {
      try {
        const userEmail = localStorage.getItem("Email");
        console.log("User email from localStorage:", userEmail);
        const res = await axios.get(`http://localhost:8070/Bookingdetail/getdetails/${userEmail}`);
        setUserBooking(res.data);
        console.log("User booking:", res.data);
      } catch (error) {
        console.log("Error fetching user booking:", error.response?.data);
        setUserBooking([]);
      }
    };

    getUserBooking();
  }, []);

  useEffect(() => {
    const fetchUserPayments = async () => {
      try {
        const userEmail = localStorage.getItem("Email");
        const res = await axios.get(`http://localhost:8070/payment/get/${userEmail}`);
        setUserPayments(res.data);
      } catch (error) {
        console.log("Error fetching user payments:", error.response?.data);
        setUserPayments([]);
      }
    };
  
    fetchUserPayments();
  }, []);
  

  const handleBookingClick = (booking) => {
    console.log("Booking clicked:", booking);
  };

  const handleInputChange = (e, bookingId) => {
    const { name, value } = e.target;
    if (name === 'Mobile_No' && isNaN(value)) {
      alert('Please enter only numeric values for Mobile No.');
      return;
    }
    if (name === 'Mobile_No' && value.length > 10) {
      const trimmedValue = value.slice(0, 10);
      setUpdatedBookingData({ ...updatedBookingData, [bookingId]: { ...updatedBookingData[bookingId], [name]: trimmedValue } });
      alert('Please enter a valid phone number with 10 digits.');
    } else {
      setUpdatedBookingData({ ...updatedBookingData, [bookingId]: { ...updatedBookingData[bookingId], [name]: value } });
    }

  };
  const handlePaymentInputChange = (e, paymentId) => {
    const { name, value } = e.target;
    setUpdatedPaymentData({ ...updatedPaymentData, [paymentId]: { ...updatedPaymentData[paymentId], [name]: value } });
  };

  const handleUpdateBooking = async (bookingId, bookingDate) => {
    const updatedDate = new Date(updatedBookingData[bookingId].dateValidity);
    const currentDate = new Date();

    if (updatedDate <= currentDate || updatedDate.toDateString() === new Date(bookingDate).toDateString()) {
      alert("Please select a valid date after today and not the same as the booked date.");
      return;
    }

    try {
      const res = await axios.put(`http://localhost:8070/Bookingdetail/update/${bookingId}`, updatedBookingData[bookingId]);
      console.log("Booking updated successfully:", res.data);
      window.location.reload();
    } catch (error) {
      console.log("Error updating booking:", error.response?.data);
    }
  };

  const handleCancelBooking = (bookingId) => {
    axios.delete(`http://localhost:8070/Bookingdetail/deletecontact/${bookingId}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error canceling booking:", err.message);
      });
  };

  const handleUpdatePayment = async (paymentId) => {
    try {
      const res = await axios.put(`http://localhost:8070/payment/update/${paymentId}`, updatedPaymentData[paymentId]);
      console.log("Payment updated successfully:", res.data);
      // Reload data or update state as needed
    } catch (error) {
      console.log("Error updating payment:", error.response?.data);
    }
  };

  const handleCancelPayment = async (paymentId) => {
    try {
      const res = await axios.delete(`http://localhost:8070/payment/delete/${paymentId}`);
      console.log("Payment canceled successfully:", res.data);
      // Reload data or update state as needed
    } catch (error) {
      console.log("Error canceling payment:", error.response?.data);
    }
  };

  

  return (
    <div style={{ backgroundColor: '#eaeaec',backgroundImage: 'url("Images/pink.jpg")',  backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            {userBooking && userBooking.length > 0 ? (
              userBooking.map((booking, index) => (
                <div key={index} className="card mb-3" style={{ ...cardStyle , boxShadow: '0.6px 0.2px 59.7px rgba(0, 0, 0, 0.033), 1.5px 0.6px 112.8px rgba(0, 0, 0, 0.07), 3px 1.2px 163.9px rgba(0, 0, 0, 0.111), 6.2px 2.6px 234px rgba(0, 0, 0, 0.156), 17px 7px 500px rgba(0, 0, 0, 0.2)',}}>
                  <div className="card-body"style={{
                boxShadow: '0.6px 0.2px 59.7px rgba(0, 0, 0, 0.033), 1.5px 0.6px 112.8px rgba(0, 0, 0, 0.07), 3px 1.2px 163.9px rgba(0, 0, 0, 0.111), 6.2px 2.6px 234px rgba(0, 0, 0, 0.156), 17px 7px 500px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#C6ACAC' // Adding background color
              }} >
                    
    <h5 className="card-title" style={{ color: '#053F5C', fontWeight: 'bold', marginBottom: '10px' }}>Package Name: {booking.Package_Name}</h5>
    <p className="card-text"><strong>Name:</strong> {booking.Name}</p>
    <p className="card-text"><strong>Email:</strong> {booking.Email}</p>
    <p className="card-text"><strong>Mobile No:</strong> {booking.Mobile_No}</p>
    <p className="card-text"><strong>Date:</strong> {booking.dateValidity}</p>
    <p className="card-text"><strong>Message:</strong> {booking.Message}</p>
    <p className="card-text"><strong>Photographer:</strong> {booking.phoname}</p>
 

                    {updatedBookingData[booking._id] && (
                      <>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Name"
                          placeholder="Name"
                          value={updatedBookingData[booking._id].Name}
                          onChange={(e) => handleInputChange(e, booking._id)}
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Mobile_No"
                          placeholder="Mobile No"
                          value={updatedBookingData[booking._id].Mobile_No}
                          onChange={(e) => handleInputChange(e, booking._id)}
                        />
                        <input
                          type="date"
                          className="form-control mb-2"
                          name="dateValidity"
                          placeholder="dateValidity"
                          value={updatedBookingData[booking._id].dateValidity}
                          onChange={(e) => handleInputChange(e, booking._id)}
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Message"
                          placeholder="Message"
                          value={updatedBookingData[booking._id].Message}
                          onChange={(e) => handleInputChange(e, booking._id)}
                        />
                      </>
                    )}
                    {!updatedBookingData[booking._id] ? (
                      <button className="btn btn-primary me-2" onClick={() => setUpdatedBookingData({ ...updatedBookingData, [booking._id]: { ...booking } })}><FaEdit /></button>
                    ) : (
                      <>
                        <button className="btn btn-success me-2" onClick={() => handleUpdateBooking(booking._id, booking.dateValidity)}><FaSave /></button>
                        <button className="btn btn-danger me-2" onClick={() => setUpdatedBookingData({ ...updatedBookingData, [booking._id]: null })}><MdCancelPresentation /></button>
                      </>
                    )}
                    <button className="btn btn-danger" onClick={() => handleCancelBooking(booking._id)}><MdCancelPresentation />booking </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No booking data available</div>
            )}
          </div>
          {/* {userPayments.map((payment, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Payment ID: {payment.payment_id}</h5>
            <p className="card-text"><strong>Cash:</strong> {payment.cash}</p>
            <p className="card-text"><strong>Bank:</strong> {payment.bank}</p>
            <p className="card-text"><strong>Date:</strong> {payment.date}</p>
           
          </div>
        </div>
      ))} */}
        </div>
      </div>
      <Photographers />
      <Footer />
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default Profile;
