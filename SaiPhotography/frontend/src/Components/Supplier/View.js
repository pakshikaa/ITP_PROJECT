import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function View() {
    const [suppliers, setSuppliers] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get("http://localhost:8070/api/v1/sup");
            setSuppliers(res.data);
            console.log("supplier :", setSuppliers)
        };
        getAllData();
    }, [])

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'ARE YOU SURE ?',
            text: "DO YOU WANT TO DELETE THIS!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#32dd32',
            cancelButtonColor: '#da2424',
            confirmButtonText: 'YES'
        });

        if (result.isConfirmed) {
            await axios.delete(`http://localhost:8070/api/v1/sup/${id}`);
            const newSupplier = suppliers.filter((item) => {
                return item._id !== id;
            });
            setSuppliers(newSupplier);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8070/api/v1/sup/search?F_name=${value}`);
            setSuppliers(res.data);
            setValue("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar />
            <div className="mt-5">
                <div className='container' style={{ backgroundColor: "#E5E5E5" }}>
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Supplier's Name"
                        aria-label="Search" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button className="btn btn-outline-success" type="submit">SEARCH</button>
                </form>
                    <h2 className="text-center"><b>ALL SUPPLIER DETAILS</b></h2>
                    <br />
                    <br />
                    <table className="table">
                        <thead>
                            <tr style={{ backgroundColor: '#002f62', color: 'white' }}>
                                <th scope="col">ID</th>
                                <th scope="col">FIRSTNAME</th>
                                <th scope="col">LASTNAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">PHONE</th>
                                <th scope="col">ADDRESS</th>
                                <th scope="col">PRODUCTS</th>
                                <th scope="col" className="edit-button">EDIT</th>
                                <th scope="col" className="delete-button">DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers && suppliers.map((supplier, index) => {
                                return (
                                    <tr key={supplier._id}>
                                        <td>{index + 1}</td>
                                        <td>{supplier.F_name}</td>
                                        <td>{supplier.L_name}</td>
                                        <td>{supplier.Email}</td>
                                        <td>{supplier.Phone}</td>
                                        <td>{supplier.Address}</td>
                                        <td>{supplier.type}</td>
                                        <td>
                                            <Link to={`/edit_sup_form/${supplier._id}`}>
                                                <button className="btn btn-primary">EDIT</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(supplier._id)} className="btn btn-danger">DELETE</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default View;
