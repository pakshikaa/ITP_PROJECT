import { useEffect, useState } from 'react';
import { Container, Row, Table, Button } from 'reactstrap'; // Added Button component
import './FeedbackApproval.css'; // Added CSS file import
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar"; // Corrected Navbar import

const ServiceFeedbackApproval = () => {
    const [servicefeedbacks, setServiceFeedbacks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServiceFeedback = async () => {
            try {
                const response = await axios.get("http://localhost:8070/api/CustomerAffairs");
                setServiceFeedbacks(response.data);
            } catch (error) {
                console.log('Error fetching service feedbacks:', error);
            }
        };
        fetchServiceFeedback();
    }, []);

    const handleServiceFeedbackDelete = (id) => {
        axios.delete(`http://localhost:8070/api/CustomerAffairs/${id}`)
            .then(response => {
                console.log('Feedback deleted successfully');
                window.alert('Data has been deleted successfully');
                window.location.reload();
            })
            .catch(error => {
                console.log('Error deleting feedback:', error);
            });
    };

    const handleGeneratePdf = async () => {
        try {
            const response = await axios.get("http://localhost:8070/api/CustomerAffairs");
            const serviceFeedbackData = response.data;

            const doc = new jsPDF();

            const headerX = doc.internal.pageSize.width - 20;

            doc.setFontSize(14);
            doc.text("Sai Photography", headerX, 20, { align: "right" });

            doc.setFontSize(12);
            doc.text(" Colombo, Malabe", headerX, 27, { align: "right" });
            doc.setFontSize(10);
            doc.text("077-1234567", headerX, 32, { align: "right" });

            doc.setLineWidth(0.5);
            doc.line(8, 42, 200, 42);

            doc.setFont("bold");
            doc.setFontSize(20);
            doc.text("Service Feedback Report", 80, 60);
            doc.setFont("normal");

            doc.setDrawColor(0);

            const columns = [
                { header: 'Date', dataKey: 'updatedAt' },
                { header: 'Customer Name', dataKey: 'name' },
                { header: 'Email', dataKey: 'email' },
                { header: 'Rating', dataKey: 'rating' },
                { header: 'Feedback', dataKey: 'feedback' }
            ];

            const rows = serviceFeedbackData.map(servicefeedback => ({
                updatedAt: servicefeedback.updatedAt.substr(0, 10),
                name: servicefeedback.name,
                email: servicefeedback.email,
                rating: servicefeedback.rating,
                feedback: servicefeedback.feedback
            }));

            doc.autoTable({ columns, body: rows, startY: 70 });

            doc.save('ServiceFeedbackReport.pdf');
        } catch (error) {
            console.error("Error fetching or generating PDF:", error);
        }
    };

    const handleClick = () => {
        window.alert('Feedback is approved successfully ');
    };

    return (
        <div className="outer-container" style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar />
            <div className="inner-container" >
                <div  >
                    <Container style={{ backgroundColor: "#E5E5E5" }}>
                        <div className="title code">Service Feedback List</div>
                        <div className="Buttonsdiv">
                            <Button color="secondary" id="btn_position" onClick={handleGeneratePdf}>Generate Feedback Report</Button>
                        </div>
                        <br />
                        <br />
                        <Row>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Customer Name</th>
                                        <th>Email</th>
                                        <th>Rating</th>
                                        <th>Feedback</th>
                                        <th>Approve</th>
                                        <th>Reject</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {servicefeedbacks.map((row) => (
                                        <tr key={row._id}>
                                            <td>{row.updatedAt.substr(0, 10)}</td>
                                            <td>{row.name}</td>
                                            <td>{row.email}</td>
                                            <td>{row.rating}</td>
                                            <td>{row.feedback}</td>
                                            <td>
                                                <Button color="success" onClick={handleClick}>Accept</Button>
                                            </td>
                                            <td>
                                                <Button color="danger" onClick={() => handleServiceFeedbackDelete(row._id)}>Reject</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </Container>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
};

export default ServiceFeedbackApproval;
