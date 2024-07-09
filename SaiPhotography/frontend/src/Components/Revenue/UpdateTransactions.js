//import "./updateTransactions.css";
import React, { useEffect, useState } from "react";
//import close from "./images/close.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function UpdateTransactions() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/transactions/update/" + id)
      .then((result) => {
        console.log(result);
        setAmount(result.data.amount);
        setType(result.data.type);
        setCategory(result.data.category);
        setDate(result.data.date);
        setDescription(result.data.description);
        setReference(result.data.reference);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8070/transactions/update/" + id, {
        amount,
        type,
        category,
        date,
        description,
        reference,
      })
      .then((result) => {
        console.log(result);
        navigate("/FinanceManagement");
      })
      .catch((err) => console.log(err));
  };

  const navigteBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ backgroundImage: 'url("/Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <Navbar/>
    <div className="container "style={{ backgroundColor: "#E5E5E5" ,maxWidth: '900px', margin: '50px auto' }}>
      
      <div className="card shadow-sm border" style={{ backgroundColor: "#E5E5E5", }}>  <div className="card-header d-flex justify-content-between align-items-center bg-light">
      <button onClick={navigteBack} className="btn btn-secondary">
        Back
      </button>
      <h1>Update Transaction Details</h1>
    </div>
    <div className="card-body">
      <form onSubmit={updateSubmit}>
        <div className="mb-3">
          <div className="d-flex align-items-center">
            <button type="button" className="close" onClick={navigteBack}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 className="ms-3 mb-0">Update Transaction Details</h5>
          </div>
        </div>

        <div className="row mb-3">
          <label for="amount" className="col-sm-2 col-form-label">Amount (LKR)</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="type" className="col-sm-2 col-form-label">Transaction Type</label>
          <div className="col-sm-10">
            <select
              className="form-select"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select transaction type</option>
              <option value="Income">Income</option>
              <option value="Expenses">Expenses</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label for="category" className="col-sm-2 col-form-label">Category</label>
          <div className="col-sm-10">
            <select
              className="form-select"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Stationery">Stationery</option>
              <option value="Supplier charges">Supplier charges</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Medical">Medical</option>
              <option value="Expenses">Expenses</option>
              <option value="TAX">TAX</option>
              <option value="Services">Services</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <label for="date" className="col-sm-2 col-form-label">Date</label>
          <div className="col-sm-10">
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="description" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <label for="reference" className="col-sm-2 col-form-label">Reference</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              required
            />
          </div>

          </div>

          <button type="submit" className="btn btn-primary float-end">
            Update transaction
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
}
