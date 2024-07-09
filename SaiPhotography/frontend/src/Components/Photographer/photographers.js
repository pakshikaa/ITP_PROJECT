import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Photographer = ({ photographer }) => {
  return (
    <Card className="flex flex-wrap gap-6 justify-center my-9 w-full">
      <Link to={`/photographer/${photographer._id}`} className="flex bg-white shadow-lg rounded-3xl w-[550px] h-[250px] overflow-hidden transition-transform transform hover:scale-105">
        <Card.Img  className="w-48 h-48 object-cover p-4"
          src={photographer.images && photographer.images.length > 0 ? 
               `http://localhost:8070/uploads/${photographer.images[0].filename}` : 
               'https://via.placeholder.com/150'} 
          variant='top' 
          
        />
      </Link>
      <Card.Body className="photographer-card-body d-flex flex-column justify-content-between px-6 py-6">
  <Link to={`/photographer/${photographer._id}`}>
    {/* Title with hover effect */}
    <Card.Title as="div" className="photographer-title text-truncate text-center fs-4 fw-bold mb-2">
      <strong>{photographer.F_name}</strong>
    </Card.Title>
  </Link>

  <div className="d-flex justify-content-between align-items-center mb-2">
    {/* Rating with custom styling */}
    <div className="photographer-rating text-warning">
      <Rating value={photographer.rating} text={`${photographer.numReviews} reviews`} />
    </div>
  </div>

</Card.Body>

    </Card>
  );
};

export default Photographer;
