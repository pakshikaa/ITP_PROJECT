import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import Navbar from './Navbar';

function Home() {
    const [photographers, setPhotographers] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get('http://localhost:8070/api/pho/sup');
            setPhotographers(res.data);
        };
        getAllData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8070/api/pho/sup/search?F_name=${value}`);
            setPhotographers(res.data);
            setValue('');
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <div >
            <Navbar />
            <div className="container" style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Photographer's Name"
                        aria-label="Search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">SEARCH</button>
                </form>

                <h2 className="text-center"><b> PHOTOGRAPHER DETAILS</b></h2>
                <br />
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr style={{ backgroundColor: '#053F5C', color: 'white' }}>
                            <th scope="col">ID</th>
                            <th scope="col">FIRSTNAME</th>
                            <th scope="col">LASTNAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">PHONE</th>
                            <th scope="col">ADDRESS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {photographers.map((photographer, index) => {
                            const rowStyle = index % 2 === 0 ? { backgroundColor: '#F0EDE5' } : { backgroundColor: '#FFFFFF' };
                            return (
                                <tr key={photographer._id} style={rowStyle}>
                                    <td>{index + 1}</td>
                                    <td>{photographer.F_name}</td>
                                    <td>{photographer.L_name}</td>
                                    <td>{photographer.Email}</td>
                                    <td>{photographer.Phone}</td>
                                    <td>{photographer.Address}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Home;
