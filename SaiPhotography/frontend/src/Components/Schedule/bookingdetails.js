import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllContacts() {
    const [bookings, setBookings] = useState([]);
    const [photographers, setPhotographers] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPhotographers, setSelectedPhotographers] = useState({});

    useEffect(() => {
        // Fetch bookings
        axios.get("http://localhost:8070/Bookingdetail/getcontactdetails")
            .then((res) => {
                setBookings(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
        
        // Fetch photographers
        axios.get("http://localhost:8070/api/pho/sup")
            .then((res) => {
                setPhotographers(res.data);
            })
            .catch((err) => {
                console.error("Error fetching photographers:", err);
                setError(err.message); // Set error state
            });

        // Retrieve selected photographers from localStorage on component mount
        const storedSelectedPhotographers = localStorage.getItem('selectedPhotographers');
        if (storedSelectedPhotographers) {
            setSelectedPhotographers(JSON.parse(storedSelectedPhotographers));
        }
    }, []);

    useEffect(() => {
        // Save selected photographers to localStorage whenever it changes
        localStorage.setItem('selectedPhotographers', JSON.stringify(selectedPhotographers));
    }, [selectedPhotographers]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8070/Bookingdetail/deletecontact/${id}`)
            .then(() => {
                setBookings(bookings.filter(booking => booking._id !== id));
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleAssignPhotographer = (bookingId) => {
       
        const photographerId = selectedPhotographers[bookingId];
        const photographerName = photographers.find(photographer => photographer._id === photographerId).F_name;
    
        axios.post(
            `http://localhost:8070/Bookingdetail/assign`,
            { bookingId: bookingId, phoname: photographerName }, // Pass bookingId and phoname in the request body
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then((res) => {
            setBookings(prevBookings => prevBookings.map(booking => {
                if (booking._id === bookingId) {
                    return { ...booking, Phoname: photographerName };
                }
                return booking;
            }));
            // Reload the page after successful assignment
        window.location.reload();
        })
        .catch((err) => {
           
                alert(err.response.data.message); // Display the error message as an alert
           
        });
    };
    
    return (
        <div style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar/>
            <div className="container mt-5">
                <h1 className="text-center">ALL BOOKING DETAILS</h1>
c
                <table className="table">
                    <thead>
                        <tr style={{ backgroundColor: '#053F5C', color: 'white' }}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Date</th>
                            <th>Message</th>
                            <th>Package Name</th>
                            <th>Photographer</th>
                            <th>Assign Photographer</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error && <tr><td colSpan="8" className="text-danger">Error: {error}</td></tr>}
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.Name}</td>
                                <td>{booking.Email}</td>
                                <td>{booking.Mobile_No}</td>
                                <td>{booking.dateValidity}</td>
                                <td>{booking.Message}</td>
                                <td>{booking.Package_Name}</td>
                                <td>{booking.phoname ? booking.phoname : "Not assigned"}</td>
                                <td>
                                    <select className="form-select" value={selectedPhotographers[booking._id]} onChange={(e) => setSelectedPhotographers({ ...selectedPhotographers, [booking._id]: e.target.value })}>
                                        <option value="">Assign Photographer</option>
                                        {photographers.map((photographer) => (
                                            <option key={photographer._id} value={photographer._id}>{photographer.F_name}</option>
                                        ))}
                                    </select>
                                    <button className="btn btn-primary btn-sm ms-2" onClick={() => handleAssignPhotographer(booking._id)}>Assign</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(booking._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
