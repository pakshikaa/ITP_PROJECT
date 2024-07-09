import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Row, Col } from 'react-bootstrap';
import Photographer from './photographers';
import Navbar from '../Feedback/Navbar';
import { FaSearch } from "react-icons/fa";


function Home() {
    const [photographers, setPhotographers] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get("http://localhost:8070/api/pho/sup");
            setPhotographers(res.data);
        };
        getAllData();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8070/api/pho/sup/search?F_name=${value}`);
            setPhotographers(res.data);
            setValue("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div  style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar/>
        <div className='container' style={{ backgroundColor: "#E5E5E5" }}>
        <h2 className="text-center"><b> PHOTOGRAPHER DETAILS</b></h2>
            <br />
            <br />
            <br />
           
           
            <form lassName="d-flex" role="search" onSubmit={handleSearch}>
            <div className="input-group">
            <input
               className="form-control me-2"
               type="search"
               placeholder="Photographer's Name"
               aria-label="Search"
               value={value}
               onChange={(e) => setValue(e.target.value)}
               style={{
                maxWidth: '600px', 
                borderRadius: '10px', 
                padding: '8px 12px', 
                fontSize: '16px', 
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #ced4da', 
            }}
            />

                 <div className="input-group-append">
                            <span className="input-group-text"><FaSearch /></span>
                </div>
                </div>
            </form>

            <Row>
                {photographers.map((photographer) => (
                    <Col key={photographer._id} sm={12} md={6} lg={4} xl={3}>
                        <Photographer photographer={photographer} />
                    </Col>
                ))}
            </Row>
        </div>
        </div>
    )
}

export default Home;
