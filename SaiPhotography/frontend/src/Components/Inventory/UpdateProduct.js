import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [rquantity, setRquantity] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [products, setProducts] = useState([]);
    

    useEffect(() => {
        const getAllData = async () => {
            const res = await axios.get("http://localhost:8070/api/v1/sup");
            setProducts(res.data);
        };
        getAllData();
    }, [])

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/Product/update/" + id)
      .then((result) => {
        setName(result.data.name);
        setType(result.data.type);
        setCategory(result.data.category);
        setDate(result.data.date);
        setRquantity(result.data.rquantity);
        setTotalPrice(result.data.totalPrice);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8070/api/Product/update/" + id, {
        name,
        type,
        category,
        date,
        rquantity,
        totalPrice,
      })
      .then((result) => {
        navigate("/InventoryMnagement");
      })
      .catch((err) => console.log(err));
  };

  const navigateBack = () => {
    navigate(-1);
  };
  const backgroundStyle = {
    backgroundImage: `url('/Images/back2.jpg')`, // Update this path to your image location
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
   // To account for fixed navbar
  };

  return (
    <div>
       
    <div style={backgroundStyle} >
    <Navbar/>
    <div style={{ maxWidth: '600px', margin: '50px auto' }}> 
      <div className="card p-4" style={{ border: 'none', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <form onSubmit={handleUpdate}>
          <button type="button" className="btn-close mb-3" onClick={navigateBack} aria-label="Close" style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none' }}></button>

          <h1 className="mb-4" style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '20px' }}>Update Product</h1>

          <div className="mb-3">
            <label htmlFor="name" className="form-label" style={{ marginBottom: '5px' }}>Name</label>
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

          <div className="mb-3">
            <label htmlFor="type" className="form-label" style={{ marginBottom: '5px' }}>Type</label>
            <select
              className="form-select"
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

          <div className="mb-3">
            <label htmlFor="category" className="form-label" style={{ marginBottom: '5px' }}>Category</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Not Selected">Select Category</option>
              <option value="Product">Product</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label" style={{ marginBottom: '5px' }}>Date</label>
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

          <div className="mb-3">
            <label htmlFor="rquantity" className="form-label" style={{ marginBottom: '5px' }}>Remaining Quantity</label>
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

          <div className="mb-3">
            <label htmlFor="totalPrice" className="form-label" style={{ marginBottom: '5px' }}>Total Price</label>
            <input
              type="text"
              className="form-control"
              id="totalPrice"
              name="totalPrice"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#007bff', border: 'none' }}>
            Update Product
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
  
  );
}
