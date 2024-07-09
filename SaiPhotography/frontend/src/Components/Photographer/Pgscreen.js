import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Form, Alert, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Rating from './Rating';
import Footer from '../Footer.js';
import Header from "../Header2.js";

const SupplierScreen = () => {
    const { id } = useParams();
    const [photographer, setPhotographer] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loadingReview, setLoadingReview] = useState(false);
    const [error, setError] = useState(null);
    const [reviewIdToUpdate, setReviewIdToUpdate] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8070/api/pho/sup/single/${id}`);
                setPhotographer(res.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const getUserEmail = () => {
          const userEmail = localStorage.getItem("Email");
          setUserEmail(userEmail); // Set user email state
        };
    
        getUserEmail();
      }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingReview(true);

        try {
            if (!comment || !rating) {
                throw new Error('Please provide both a rating and a comment.');
            }

            if (reviewIdToUpdate) {
                // Update review
                await axios.put(`http://localhost:8070/api/pho/sup/${id}/review/${reviewIdToUpdate}`, { rating, comment,userEmail });
                Swal.fire({ icon: 'success', title: 'Success!', text: 'Review updated successfully' });
                setReviewIdToUpdate(null);
            } else {
                // Create new review
                await axios.post(`http://localhost:8070/api/pho/sup/${id}/review`, { rating, comment, userEmail });
                Swal.fire({ icon: 'success', title: 'Success!', text: 'Review created successfully' });
            }

            setLoadingReview(false);
            setRating(0);
            setComment('');

            const res = await axios.get(`http://localhost:8070/api/pho/sup/single/${id}`);
            setPhotographer(res.data);
        } catch (err) {
            setLoadingReview(false);
            Swal.fire({ icon: 'error', title: 'Error!', text: err?.response?.data?.message || 'Failed to create/update review' });
        }
    };

    const handleEdit = (review) => {
        setRating(review.rating);
        setComment(review.comment);
        setReviewIdToUpdate(review._id);
    };

    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:8070/api/pho/sup/${id}/review/${reviewId}`, {
                data: { userEmail } // Include userEmail in the request body
            });
    
            setPhotographer((prevPhotographer) => ({
                ...prevPhotographer,
                reviews: prevPhotographer.reviews.filter((review) => review._id !== reviewId),
            }));
            Swal.fire({ icon: 'success', title: 'Success!', text: 'Review deleted successfully' });
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error!', text: 'Failed to delete review' });
        }
    };
    

    const headerStyle = {
        color: '#176B87',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '40px'
    };
    const backgroundStyle = {
        backgroundImage: `url('/Images/pink.jpg')`, // Ensure the correct path to the image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      };

    return (
        <div className="background" style={backgroundStyle}>
            <Header />
            <div className="container mt-5" style={{
                boxShadow: '0.6px 0.2px 59.7px rgba(0, 0, 0, 0.033), 1.5px 0.6px 112.8px rgba(0, 0, 0, 0.07), 3px 1.2px 163.9px rgba(0, 0, 0, 0.111), 6.2px 2.6px 234px rgba(0, 0, 0, 0.156), 17px 7px 500px rgba(0, 0, 0, 0.2)',
                // Adding background color
            }}>
                <Link
                    style={{
                        backgroundColor: '#053F5C',
                        color: '#fff',
                        borderRadius: '3px',
                        padding: '0.25rem 0.5rem',
                        textDecoration: 'none',
                        fontSize: '0.875rem', // Adjust font size as needed
                    }}
                    className='my-3'
                    to='/profile'
                >
                    Go Back
                </Link>

                {photographer ? (
                    <Container>
                        <Row className='supplier-details'>
                            <Col md={4}>
                                <Card.Img
                                    src={photographer.images && photographer.images.length > 0 ?
                                        `http://localhost:8070/uploads/${photographer.images[0].filename}` :
                                        'https://via.placeholder.com/150'}
                                    variant="top"
                                    fluid
                                    rounded
                                    className="w-100 img-fluid p-2"
                                />
                                <Card.Title style={headerStyle}>{photographer.F_name}</Card.Title>
                                <Card.Text as="div" className="photographer-title text-truncate text-center fs-4 fw-bold mb-2">
                                    <Rating value={photographer.rating} />
                                    {`${photographer.numReviews} reviews`}
                                </Card.Text>
                            </Col>
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {photographer.reviews.length === 0 && <Alert variant='info'>No Reviews</Alert>}
                                <ListGroup variant='flush'>
    {photographer.reviews
        .filter(review => review.userEmail === userEmail) // Filter reviews by userEmail
        .map((review, index) => (
            <ListGroup.Item key={index} className="w-full p-2 border rounded">
                <Rating value={review.rating} />
                <p>{review.comment}</p>
                {review.userEmail === userEmail && (
                    <>
                        <Button onClick={() => handleEdit(review)} variant="info" style={{ backgroundColor: '#053F5C', color: 'white', marginRight: '5px' }}>Edit</Button>
                        <Button onClick={() => handleDelete(review._id)} variant="danger">Delete</Button>
                    </>
                )}
            </ListGroup.Item>
        ))
    }
</ListGroup>
                                <ListGroup.Item className="write-review">
                                    <h2>Write a Customer Review</h2>
                                    {loadingReview && <Alert variant='info'>Submitting review...</Alert>}
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                required
                                            >
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Bad</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='comment'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                rows={3}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Button type='submit' variant='primary' disabled={loadingReview} style={{ backgroundColor: '#053F5C', color: 'white' }}>
                                            {reviewIdToUpdate ? 'Update' : 'Submit'}
                                        </Button>
                                    </Form>
                                </ListGroup.Item>
                            </Col>
                        </Row>
                        <Container>
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {photographer.reviews.length === 0 && <Alert variant='info'>No Reviews</Alert>}
                                <ListGroup variant='flush'>
                                    {photographer.reviews.map((review, index) => (
                                        <ListGroup.Item key={index} className="w-full p-2 border rounded">
                                            <Rating value={review.rating} />
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Container>
                    </Container>
                ) : loadingReview ? (
                    <Alert variant='info'>Loading photographer details...</Alert>
                ) : error ? (
                    <Alert variant='danger'>{error.message || 'Failed to fetch photographer details'}</Alert>
                ) : null}
            </div>
            <Footer />
        </div>
    );
};

export default SupplierScreen;
