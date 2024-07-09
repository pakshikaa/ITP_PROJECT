import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Insert() {
    const [input, setInput] = useState({
        F_name: "",
        L_name: "",
        Email: "",
        Phone: "",
        Address: "",
        type: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        for (const field in input) {
            if (!input[field]) {
                Swal.fire({
                    icon: 'error',
                    title: 'PLEASE FILL ALL FIELDS',
                    text: 'Please fill in all required fields before submitting the form.',
                });
                return;
            }
        }

        // Check if the email format is valid
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.Email)) {
            Swal.fire({
                icon: 'error',
                title: 'INVALID EMAIL',
                text: 'Please enter a valid email address.',
            });
            return;
        }

        // Check if the phone number format is valid
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(input.Phone)) {
            Swal.fire({
                icon: 'error',
                title: 'INVALID PHONE NUMBER',
                text: 'Please enter a 10-digit phone number.',
            });
            return;
        }

        // If all validations pass, proceed to submit the form
        try {
            await axios.post("http://localhost:8070/api/v1/sup", input);
            Swal.fire({
                icon: "success",
                title: "Supplier Successfully Added!",
                confirmButtonText: "OK",
                onConfirm: () => {
                    // Optionally add any action here after confirming
                },
            });
            setInput({
                F_name: "",
                L_name: "",
                Email: "",
                Phone: "",
                Address: "",
                type: "",
            });
        } catch (error) {
            // Handle error from API request
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while adding the supplier. Please try again later.",
            });
        }
    };

    const handleInputChange = event => {
        let { name, value } = event.target;

        
        if (name === 'Phone') {
            // Ensure that the phone number starts with '0'
            if (value.length > 0 && value[0] !== '0') {
                // If it doesn't start with '0', prepend '0' to the value
                value = '0' + value;
            }
        }

        // Check for special characters or numbers in first name and last name
        if ((name === 'F_name' || name === 'L_name') && /[^a-zA-Z\s]/.test(value)) {
            // Display error message
            alert("Special characters and numbers are not allowed in the first name and last name.");
            return;
        }

        setInput(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar />
            <div className="card p-4" style={{ border: 'none', borderRadius: '9px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' ,backgroundColor: "#E5E5E5",maxWidth: '700px', margin: '20px auto' }}>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center mt-5 mb-3"><b>ADD NEW SUPPLIER</b></h2>
                    <div className="row justify-content-center">
                       
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">FIRST NAME</label>
                                <input
                                    name="F_name"
                                    value={input.F_name}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">LAST NAME</label>
                                <input
                                    name="L_name"
                                    value={input.L_name}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">EMAIL</label>
                                <input
                                    name="Email"
                                    value={input.Email}
                                    onChange={handleInputChange}
                                    type="email"
                                    className="form-control"
                                    id="exampleNic"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">PHONE</label>
                                <input
                                    name="Phone"
                                    value={input.Phone}
                                    onChange={handleInputChange}
                                    type="phone"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">ADDRESS</label>
                                <input
                                    name="Address"
                                    value={input.Address}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">PRODUCTS</label>
                                <input
                                    name="type"
                                    value={input.type}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-success">SUBMIT</button>
                                <Link to="/supplierHome" className="btn btn-danger">CANCEL</Link>
                            </div>
                      
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Insert;
