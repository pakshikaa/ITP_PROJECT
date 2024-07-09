import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Card, Modal, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import ServiceFeedbackForm from '../Feedback/ServiceFeedbackform';
import { FaAlignCenter, FaSearch } from "react-icons/fa";
import Pgscreen from'./Pgscreen';

function Home() {
  const [photographers, setPhotographers] = useState([]);
  const [value, setValue] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get("http://localhost:8070/api/pho/sup");
        setPhotographers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllData();
  }, []);

  useEffect(() => {
    const getUserEmail = () => {
      const userEmail = localStorage.getItem("Email");
      console.log("User email from localStorage:", userEmail);
      setUserEmail(userEmail); // Set user email state
    };

    getUserEmail();
  }, []);;

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

  const handleFeedbackModalOpen = () => {
    setShowFeedbackModal(true);
  };

  const handleFeedbackModalClose = () => {
    setShowFeedbackModal(false);
  };

  const containerStyle = {
    padding: '20px', // Padding added to all sides
   
    borderRadius: '10px',
    color: '#333', // Text color
    fontFamily: 'Arial, sans-serif', // Font family
    fontSize: '16px', // Font size
    lineHeight: '1.5', // Line height
    textAlign: 'left', // Text alignment
    //boxShadow: '0.6px 0.2px 59.7px rgba(0, 0, 0, 0.033), 1.5px 0.6px 112.8px rgba(0, 0, 0, 0.07), 3px 1.2px 163.9px rgba(0, 0, 0, 0.111), 6.2px 2.6px 234px rgba(0, 0, 0, 0.156), 17px 7px 500px rgba(0, 0, 0, 0.2)',
    padding: '100px', // Overriding the previous padding with new value
  };
  
  
  const headerStyle = {
    color: '#176B87',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
     
        {/* <form role="search" onSubmit={handleSearch}>
          <div className="input-group mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Photographer's Name"
              aria-label="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="input-group-append">
              <span className="input-group-text"><FaSearch /></span>
            </div>
          </div>
        </form> */}

        <div className="row mb-4">
          <div className="col-md-12">
            <h2 style={headerStyle}>PHOTOGRAPHERS</h2>
          </div>
        </div>

        <Row xs={1} md={4} className="g-4">
          {photographers.map((photographer) => (
            <Col key={photographer._id}>
              <Card className="flex flex-wrap gap-6 justify-center my-9 w-full" style={{
                boxShadow: '0.6px 0.2px 59.7px rgba(0, 0, 0, 0.033), 1.5px 0.6px 112.8px rgba(0, 0, 0, 0.07), 3px 1.2px 163.9px rgba(0, 0, 0, 0.111), 6.2px 2.6px 234px rgba(0, 0, 0, 0.156), 17px 7px 500px rgba(0, 0, 0, 0.2)',
                backgroundColor: '#C6ACAC' // Adding background color
              }}>
                {photographer.images && photographer.images.length > 0 && (
                  <Link to={`/photographerCus/${photographer._id}/${userEmail}`}>
                    <Card.Img
                      variant="top"
                      src={photographer.images[0] ? `http://localhost:8070/uploads/${photographer.images[0].filename}` : 'https://via.placeholder.com/150'}
                      alt="Photographer Image"
                      className="w-100 img-fluid p-2"
                    />
                  </Link>
                )}
                <Card.Body className="photographer-card-body d-flex flex-column justify-content-between px-6 py-6">
                
                  <Link to={`/photographerCus/${photographer._id}/${userEmail}`} className="text-decoration-none">
                    <Card.Title style={headerStyle}>{photographer.F_name}</Card.Title>
                  </Link>
                  <Card.Text as="div" className="photographer-title text-truncate text-center fs-4 fw-bold mb-2">
                    <Rating value={photographer.rating} />
                    {/* <span className="ms-2">{photographer.numReviews} reviews</span> */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Button variant="primary" onClick={handleFeedbackModalOpen} className="mt-4" style={{ backgroundColor: '#053F5C', color: 'white' }}>
          Service Feedback
        </Button>

        <Modal show={showFeedbackModal} onHide={handleFeedbackModalClose} >
          <Modal.Header closeButton>
            <Modal.Title>Service Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ServiceFeedbackForm />
          </Modal.Body>
        </Modal>
      </div>
   
  );
}

export default Home;
