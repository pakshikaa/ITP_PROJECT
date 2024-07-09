import React, { useState, useEffect } from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Navbar from "./Navbar";

export default function ViewPayment() {
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(-1);
    const [message, setMessage] = useState("");
    const [editPaymentId, setEditPaymentId] = useState("");
    const [editCash, setEditCash] = useState("");
    const [editBank, setEditBank] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editEmail, setEditEmail] = useState(""); // State for editing email
    const [pays, setPays] = useState([]);
    const [editImage, setEditImage] = useState(null);
    const [apiurl, setApiUrl] = useState("http://localhost:8070/payment");
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleUpdateEditCancel = () => {
        setEditId(-1);
        setEditPaymentId("");
        setEditCash("");
        setEditBank("");
        setEditDate("");
        setEditEmail(""); // Reset edited email
        setEditImage(null); // Reset edited image
    };

    const handleUpdate = (id) => {
        const updatedPayment = {
            payment_id: editPaymentId,
            cash: editCash,
            bank: editBank,
            date: editDate,
            Email: editEmail, // Update email field
            image: editImage
        };
    
        fetch(apiurl + "/update/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPayment)
        }).then((res) => {
            if (res.ok) {
                setPays(pays.map((item) => {
                    if (item._id === id) {
                        return { ...item, payment_id: editPaymentId, cash: editCash, bank: editBank, date: editDate, Email: editEmail, image: editImage };
                    } else {
                        return item;
                    }
                }));
                setMessage("Payment updated successfully");
                setTimeout(() => {
                    setMessage("");
                }, 3000);
                setSelectedImage(editImage);
                handleUpdateEditCancel();
            } else {
                setError("Unable to update payment");
            }
        }).catch(error => {
            console.error("Error updating payment:", error);
            setError("Unable to update payment");
        });
    };

    const handleDelete = (id) => {
        fetch(apiurl + "/delete/" + id, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok) {
                setPays(pays.filter((item) => item._id !== id));
                setMessage("Payment deleted successfully");
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } else {
                setError("Unable to delete payment");
            }
        });
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setEditPaymentId(item.payment_id);
        setEditCash(item.cash);
        setEditBank(item.bank);
        setEditDate(item.date);
        setEditEmail(item.Email); // Set email for editing
        setEditImage(item.image);
    };

    const handleEditCancel = () => {
       // setEditId(-1);
        setEditPaymentId("");
        setEditCash("");
        setEditBank("");
        setEditDate("");
        //setEditEmail(""); // Reset edited email
        setEditImage(null); // Reset edited image
    };

    useEffect(() => {
        const getItems = () => {
            fetch(apiurl + "/get")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return res.json();
                })
                .then((res) => {
                    setPays(res);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        };

        getItems();
    }, [apiurl]);

    useEffect(() => {
        const results = pays.filter(pay =>
            pay.payment_id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setPays(results);
    }, [searchTerm]);

    const handleGeneratePdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Payment Report', 14, 22);
        const columns = [    
            { header: 'PAYMENT_ID', dataKey: 'payment_id' },
            { header: 'EMAIL', dataKey: 'Email' },        
            { header: 'CASH', dataKey: 'cash' },    
            { header: 'BANK', dataKey: 'bank' },    
            { header: 'DATE', dataKey: 'date' },      
        ];
        const rows = pays.map(item => ({
            payment_id: item.payment_id.substr(0,10),
            Email: item.Email,
            cash: item.cash,
            bank: item.bank,
            date: item.date, 
        }));
        
        doc.autoTable(columns, rows);
        doc.save('Payment.pdf');
    };

    return (
        <div style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
            <Navbar />
            <div className="container mt-4" style={{ backgroundColor: "#E5E5E5" }}>
                <div className="Buttonsdiv">
                    <button className="btn btn-secondary" id="btn_position" onClick={handleGeneratePdf}>Generate Payment Report</button>
                </div>

                <div className="row mt-3">
                    <h3 className="text-center text-primary">PAYMENTS LISTINGS</h3>
                    <input
                        type="text"
                        placeholder="Search payment ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                    />

                    <table className="table table-bordered mt-3">
                        <thead className="thead-dark">
                            <tr>
                                <th>PAYMENT ID</th>
                                <th>EMAIL</th> {/* Added missing column */}
                                <th>CASH</th>
                                <th>BANK</th>
                                <th>DATE</th>
                                <th>IMAGE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pays.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.Email}</td>
                                    <td>{editId !== item._id ? item.cash : <input placeholder="cash" value={editCash} onChange={(e) => setEditCash(e.target.value)} className="form-control" type="text" />}</td>
                                    <td>{editId !== item._id ? item.bank : <input placeholder="bank" value={editBank} onChange={(e) => setEditBank(e.target.value)} className="form-control" type="text" />}</td>
                                    <td>{editId !== item._id ? item.date : <input placeholder="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="form-control" type="date" />}</td>
                                    <td>
                                        {item.image ? (
                                            <img
                                                src={`${apiurl}/uploads/${item.image}`}
                                                alt="Payment"
                                                className="img-fluid mt-2"
                                                onClick={() => {
                                                    setSelectedImage(item.image);
                                                    setIsLightboxOpen(true);
                                                }}
                                            />
                                        ) : (
                                            <span className="text-muted">No image</span>
                                        )}
                                    </td>
                                    <td>
                                        {editId !== item._id ? (
                                            <>
                                                <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-primary" onClick={() => handleUpdate(item._id)}>Update</button>
                                                <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Lightbox */}
            {isLightboxOpen && (
                <Lightbox
                    mainSrc={`${apiurl}/uploads/${selectedImage}`}
                    onCloseRequest={() => setIsLightboxOpen(false)}
                />
            )}
        </div>
    );
}
