import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllContacts() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalInventory, setOriginalInventory] = useState([]);

    useEffect(() => {
        // Fetch bookings
        axios.get("http://localhost:8070/Bookingdetail/getcontactdetails")
            .then((res) => {
                setBookings(res.data);
                setOriginalInventory(res.data); // Store original inventory
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8070/Bookingdetail/deletecontact/${id}`)
            .then(() => {
                setBookings(bookings.filter(booking => booking._id !== id));
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
        filterInventory(event.target.value);
    };

    const filterInventory = (query) => {
        if (query === "") {
            // If search query is empty, display original inventory
            setBookings(originalInventory);
        } else {
            const filtered = originalInventory.filter((item) =>
                Object.values(item).some(
                    (value) =>
                        value &&
                        value
                            .toString()
                            .toLowerCase()
                            .includes(query.toLowerCase())
                )
            );
            setBookings(filtered);
        }
    };
    
    const downloadPDF = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8070/Bookingdetail/getcontactdetails"
          );
          const inventoryData = response.data;
    
          const doc = new jsPDF();
    
          const headerX = doc.internal.pageSize.width - 20;
    
          doc.setFontSize(14);
          doc.text("Sai Photography", headerX, 20, { align: "right" });
    
          doc.setFontSize(12);
          doc.text(" Colombo, Malabe", headerX, 27, {
            align: "right",
          });
          doc.setFontSize(10);
          doc.text("077-1234567", headerX, 32, {
            align: "right",
          });
    
          doc.setLineWidth(0.5);
          doc.line(8, 42, 200, 42);
    
          doc.setFont("bold");
          doc.setFontSize(20);
          doc.text("Booking Report", 80, 60);
          doc.setFont("normal");
    
          doc.setDrawColor(0);
    
          const columns = [
            { header: "Name", dataKey: "Name" },
            { header: "Email", dataKey: "Email" },
            { header: "Mobile No", dataKey: "Mobile_No" },
            { header: "Date", dataKey: "dateValidity" },
            { header: "Message", dataKey: "Message" },
            { header: "Package Name", dataKey: "Package_Name" },
            { header: "Photographer", dataKey: "phoname" },
        ];
    
        const rows = bookings.map((booking) => ({
            Name: booking.Name,
            Email: booking.Email,
            Mobile_No: booking.Mobile_No,
            dateValidity: booking.dateValidity,
            Message: booking.Message,
            Package_Name: booking.Package_Name,
            phoname: booking.phoname,
        }));
    
          autoTable(doc, { columns, body: rows, startY: 70 });
    
          doc.save("Inventory Report.pdf");
        } catch (error) {
          console.error("Error fetching or generating PDF:", error);
        }
      };

    return (
        <div style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar/>
            <div className="container mt-4">
                <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()} >
                    <div className="input-group">
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search All Details"
                            aria-label="Search" 
                            value={searchTerm} 
                            onChange={handleSearchInputChange} 
                        />
                        <div className="input-group-append">
                            <span className="input-group-text"><FaSearch /></span>
                        </div>
                    </div>
                </form>
                <div className="d-flex justify-content-end mb-3">
                    <button 
                        className="btn btn-primary"
                        onClick={downloadPDF}
                    >
                        Download PDF
                    </button>
                </div>
                <h1 className="text-center">ALL BOOKING DETAILS</h1>

                <table className="table">
                    <thead >
                        <tr style={{ backgroundColor: '#053F5C', color: 'white' }}>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Date</th>
                            <th>Message</th>
                            <th>Package Name</th>
                            <th>Photographer</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error && <tr><td colSpan="8" style={{ color: 'red' }}>Error: {error}</td></tr>}
                        {bookings.map((booking, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'table-primary' : ''}>
                                <td>{booking.Name}</td>
                                <td>{booking.Email}</td>
                                <td>{booking.Mobile_No}</td>
                                <td>{booking.dateValidity}</td>
                                <td>{booking.Message}</td>
                                <td>{booking.Package_Name}</td>
                                <td>{booking.phoname}</td>
                                <td>
                                    <button 
                                        className="btn btn-dark"
                                        onClick={() => handleDelete(booking._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
