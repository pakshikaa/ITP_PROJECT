import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const [suppliers, setSuppliers] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        const getAllData = async () => {
            try {
                const res = await axios.get("http://localhost:8070/api/v1/sup");
                setSuppliers(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllData();
    }, []);

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
            <div className="container" style={{ backgroundColor: "#E5E5E5" }}>
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Supplier's Name"
                        aria-label="Search" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button className="btn btn-outline-success" type="submit">SEARCH</button>
                </form>
                <h2 className="text-center"><b> SUPPLIERS DETAILS</b></h2>
                <table className="table table-striped table-bordered mt-3">
                    <thead>
                        <tr style={{ backgroundColor: '#002f62', color: 'white' }}>
                            <th scope="col">ID</th>
                            <th scope="col">FIRSTNAME</th>
                            <th scope="col">LASTNAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">ADDRESS</th>
                            <th scope="col">PRODUCTS</th>
                            <th scope="col">Quntitycheck</th>
                           



                        </tr>
                    </thead>
                    <tbody>
                        {suppliers && suppliers.map((supplier, index) => (
                            <tr key={supplier._id}>
                                <td>{index + 1}</td>
                                <td>{supplier.F_name}</td>
                                <td>{supplier.L_name}</td>
                                <td>{supplier.Email}</td>
                                <td>{supplier.Phone}</td>
                                <td>{supplier.Address}</td>
                                <td>{supplier.type}</td>
                                <td>{supplier.check}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
