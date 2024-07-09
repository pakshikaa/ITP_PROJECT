import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [rquantity, setRquantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
  const [products, setProducts] = useState([]);
    

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get("http://localhost:8070/api/v1/sup");
            setProducts(res.data);
        };
        getAllData();
    }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Name validation: only letters and spaces are allowed
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
      setErrorMessage("Name can only contain letters and spaces.");
      return;
    }

    // Remaining quantity validation: only positive integers are allowed
    if (!/^\d+$/.test(rquantity) || parseInt(rquantity, 10) <= 0) {
      setErrorMessage("Remaining quantity must be a positive integer.");
      return;
    }

    // Total price validation: must be a positive number
    if (isNaN(parseFloat(totalPrice)) || parseFloat(totalPrice) <= 0) {
      setErrorMessage("Total price must be a positive number.");
      return;
    }

    // Date validation: must not be a future date
    if (new Date(date) > new Date()) {
      setErrorMessage("Date cannot be in the future.");
      return;
    }

    setErrorMessage(""); // Clear the error message if all validations pass

    const inventoryData = {
      name,
      type,
      category,
      date,
      rquantity,
      totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:8070/api/Product/add",
        inventoryData
      );

      if (response.status === 201) {
        navigate("/InventoryMnagement");
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
      <Navbar />
      <div className="container mt-5" style={{ backgroundColor: "#E5E5E5", maxWidth: '600px', margin: '50px auto' }}>
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h1>Add Products</h1>
            <button className="btn btn-danger" onClick={navigateBack}>
              Close
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-3">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                className="form-control"
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">Select type</option>
                {products.map((product) => (
                  <option key={product._id} value={product.type}>{product.type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                className="form-control"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Product">Product</option>
                <option value="Equipment">Equipment</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
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
            <div className="form-group">
              <label htmlFor="rquantity">Remaining quantity</label>
              <input
                type="text"
                className="form-control"
                id="rquantity"
                name="rquantity"
                value={rquantity}
                onChange={(e) => setRquantity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="totalPrice">Total Price</label>
              <input
                type="number"
                className="form-control"
                id="totalPrice"
                name="totalPrice"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
