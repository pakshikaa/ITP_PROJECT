import React from "react";
import './Options.css'; // Import your custom styles (optional)
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap'; // Import Bootstrap components
import Navbar from "./Navbar";


const FeedbackOptions = () => {
  const navigate = useNavigate();

  const handlePhotographerFeedbackClick = () => {
    navigate(`/PhoRating`);
  };

  const handleServiceFeedbackClick = () => {
    navigate(`/ServiceFeedbackApproval`);
  };

  return (
    <div style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Navbar />
      <Container fluid className="feedback-options d-flex flex-column justify-content-center min-vh-100" >
        <Row className="options-row justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <section className="optionssec">
              <h1 className="title">Select the option you wish to proceed</h1>
              <div className="Optionscontainer d-flex flex-column gap-3">
                <button className="btn btn-primary mb-3" id="Ratingbutton" onClick={handlePhotographerFeedbackClick}>Photographer Rating</button>
                <button className="btn btn-primary" id="servicebutton" onClick={handleServiceFeedbackClick}>Service Feedback</button>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FeedbackOptions;
