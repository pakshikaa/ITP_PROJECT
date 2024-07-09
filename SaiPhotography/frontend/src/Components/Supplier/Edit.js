import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
//import backgroundImage from 'SaiPhotography/frontend/public/Images/back2.jpg';

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [input, setInput] = useState({
        F_name: "",
        L_name: "",
        Email: "",
        Phone: "",
        Address: "",
        type: "",
    });

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get(`http://localhost:8070/api/v1/sup/single/${id}`);
            setInput(res.data);
        };
        getAllData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do You Want To Update This",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#32dd32',
            cancelButtonColor: '#da2424',
            confirmButtonText: 'YES'
        });

        if (result.isConfirmed) {
            await axios.put(`http://localhost:8070/api/v1/sup/${id}`, input);
            navigate('/edit');
        } else {
            navigate('/edit');
        }
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };
    const backgroundStyle = {
        backgroundImage: `url('/Images/back2.jpg')`, // Update this path to your image location
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
       // To account for fixed navbar
      };

    return (
        <div style={{ backgroundImage: `url(/Images/back2.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar />
            <div className='container' style={{ backgroundColor: "#E5E5E5" ,maxWidth: '600px', margin: '50px auto' }}>
                <form onSubmit={handleUpdate}>
                    <div className='row'>
                        <h4 className="mb-4" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '20px' }}>SUPPLIER DETAILS</h4><br></br>
                        <div>
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputEmail1" className="form-label">SUPPLIER FULL NAME</label>
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
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputPassword1" className="form-label">SUPPLIER LAST NAME</label>
                                <input
                                    name="L_name"
                                    value={input.L_name}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputPassword1" className="form-label">EMAIL</label>
                                <input
                                    name="Email"
                                    value={input.Email}
                                    onChange={handleInputChange}
                                    type="email"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                            <div className="mb-3 ">
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
                            <div className="mb-3 ">
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
                            <div className="mb-3 ">
                                <label htmlFor="exampleInputPassword1" className="form-label">Products</label>
                                <input
                                    name="Products"
                                    value={input.type}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-3">
                        <button type="submit" className="btn btn-primary w-10" style={{ backgroundColor: '#007bff', border: 'none' }}>UPDATE</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit;
