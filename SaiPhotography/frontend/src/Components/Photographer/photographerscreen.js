import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Form, Alert } from 'react-bootstrap';
import Swal from "sweetalert2";
import Rating from './Rating';

const PhotographerScreen = () => {
    const { id } = useParams();
    const [photographer, setPhotographer] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loadingReview, setLoadingReview] = useState(false);
    const [error, setError] = useState(null);

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

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingReview(true);

        try {
            await axios.post(`http://localhost:8070/api/pho/sup/${id}/review`, { rating, comment });

            setLoadingReview(false);
            Swal.fire({ icon: 'success', title: 'Success!', text: 'Review created successfully' });
            setRating(0);
            setComment('');
            // Refetch customer data after submitting the review
            const res = await axios.get(`http://localhost:8070/api/pho/sup/single/${id}`);
            setPhotographer(res.data);
        } catch (err) {
            setLoadingReview(false);
            Swal.fire({ icon: 'error', title: 'Error!', text: err?.response?.data?.message || 'Failed to create review' });
        }
    };

    const deleteReviewHandler = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:8070/api/pho/sup/${id}/review/${reviewId}`);
            // Refetch customer data after deleting the review
            const res = await axios.get(`http://localhost:8070/api/pho/sup/single/${id}`);
            setPhotographer(res.data);
            Swal.fire({ icon: 'success', title: 'Success!', text: 'Review deleted successfully' });
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Error!', text: err?.response?.data?.message || 'Failed to delete review' });
        }
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {photographer ? (
                <>
                    <Row>
                        <Col md={6}>
                            <Image src={photographer.images && photographer.images.length > 0 ? 
               `http://localhost:8070/uploads/${photographer.images[0].filename}` : 
               'https://via.placeholder.com/150'} 
          variant='top' fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{photographer.F_name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={photographer.rating}
                                        text={`${photographer.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row className='review'>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {photographer.reviews.length === 0 && <Alert variant='info'>No Reviews</Alert>}
                            <ListGroup variant='flush'>
                                {photographer.reviews.map((review, index) => (
                                    <ListGroup.Item key={index}>
                                        <Rating value={review.rating} />
                                        <p>{review.comment}</p>
                                        <Button
                                            variant='danger'
                                            onClick={() => deleteReviewHandler(review._id)}
                                        >
                                            Delete
                                        </Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            
                        </Col>
                    </Row>
                </>
            ) : loadingReview ? (
                <Alert variant='info'>Loading photographer details...</Alert>
            ) : error ? (
                <Alert variant='danger'>{error.message || 'Failed to fetch supplier details'}</Alert>
            ) : null}
        </>
    );
};

export default PhotographerScreen;
