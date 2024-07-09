import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './../Style/Home.css';

export default function AllCustomers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        function getCustomers() {
            axios.get("http://localhost:8070/webuser/accountdetails")
                .then((res) => {
                    console.log(res.data);
                    setCustomers(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getCustomers();
    }, []);

    const headingStyle = {
        fontSize: '24px',
        color: '#DEB887',
        marginBottom: '30px',
        paddingTop:'25px'
    };

    const tableStyle = {
        width: '100%',
        border: 'none',
        backgroundColor:'#A38469',
        
    };

    const cellStyle = {
        padding: '10px',
        textAlign: 'center',
        borderBottom: '1px solid #ccc', 
    };

    return (
        <div>
            <header style={{ backgroundColor: "#5E503F", height: '100px', textAlign: 'center' }}>
                <nav>
                    <h1 style={headingStyle}>ALL CUSTOMER DETAILS</h1>
                    <nav style={{ position: "absolute", top: "30px", right: "20px", zIndex: "1", display: "flex", alignItems: "center" }}>
                        <a href="/Admindash" style={{ color: "white", marginLeft: "25px", marginRight: "20px", textDecoration: "none", textAlign: 'right' }}>Back</a>
                    </nav>
                </nav>
            </header>

            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Email</th>
                        <th style={cellStyle}>Username</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {customers.map((cus) => (
                        <tr key={cus._id}>
                            <td style={cellStyle}>{cus.Email}</td>
                            <td style={cellStyle}>{cus.UserName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
