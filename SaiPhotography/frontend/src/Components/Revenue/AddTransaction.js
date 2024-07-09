import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function AddTransaction() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    // Validation
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }
    if (new Date(date) > new Date()) {
      newErrors.date = "The date cannot be in the future.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!reference.trim()) {
      newErrors.reference = "Reference is required.";
    }

    const financeData = {
      amount,
      type,
      category,
      date,
      description,
      reference,
    };

    try {
      const response = await axios.post(
        "http://localhost:8070/transactions/add",
        financeData
      );

      if (response.status === 201) {
        navigate("/FinanceManagement");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    
    <div style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
  <Navbar />  {/* Assuming you have a separate Navbar component */}
  <div className="container" style={{ backgroundColor: "#E5E5E5" ,maxWidth: '900px', margin: '50px auto' }}>  {/* Added shadow and removed unnecessary border */}
    <div className="card-header d-flex justify-content-between align-items-center bg-light">
      <button onClick={navigateBack} className="btn btn-secondary">
        Back
      </button>
      <h1 className="m-0">Add Transaction Details</h1>
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label for="amount" className="col-sm-2 col-form-label">Amount (LKR)</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="amount"
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
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Transaction Type</option>
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Stationery">Stationery</option>
              <option value="Supplier charges">Supplier charges</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
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
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary float-end">Create Transaction</button>
      </form>
    </div>
  </div>
</div>

  );
}
