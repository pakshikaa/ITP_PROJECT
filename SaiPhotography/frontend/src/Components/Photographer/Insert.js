import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

function Insert() {
  const [input, setInput] = useState({
    F_name: '',
    L_name: '',
    images: [],
    Email: '',
    Phone: '',
    Address: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!input.F_name) newErrors.F_name = 'First name is required';
    if (!input.L_name) newErrors.L_name = 'Last name is required';
    if (input.images.length === 0) newErrors.images = 'At least one image is required';
    if (!input.Email) {
      newErrors.Email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(input.Email)) {
      newErrors.Email = 'Email address is invalid';
    }
    if (!input.Phone) {
      newErrors.Phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(input.Phone)) {
      newErrors.Phone = 'Phone number is invalid, must be 10 digits';
    }
    if (!input.Address) newErrors.Address = 'Address is required';
    return newErrors;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fix the errors before submitting',
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('F_name', capitalizeFirstLetter(input.F_name));
      formData.append('L_name', capitalizeFirstLetter(input.L_name));
      input.images.forEach(image => {
        formData.append('images', image);
      });
      formData.append('Email', input.Email);
      formData.append('Phone', input.Phone);
      formData.append('Address', input.Address);

      await axios.post('http://localhost:8070/api/pho/sup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Photographer Successfully Added!',
        confirmButtonText: 'OK',
        onConfirm: () => {
          window.location.reload();
        },
      });

      setInput({
        F_name: '',
        L_name: '',
        images: [],
        Email: '',
        Phone: '',
        Address: '',
      });
      setErrors({});
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response ? error.response.data.message : 'An error occurred while processing your request',
      });
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const images = Array.from(event.target.files);
    setInput(prevInput => ({
      ...prevInput,
      images: [...prevInput.images, ...images],
    }));
  };

  return (
    <div style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <Navbar />
      <div className="container" style={{ backgroundColor: "#E5E5E5", border: 'none', borderRadius: '9px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', maxWidth: '700px', margin: '20px auto' }}>
        <form className="con" onSubmit={handleSubmit}>
          <div className="row">
            <h2><b><center>ADD NEW PHOTOGRAPHER</center></b></h2><br />

            <div>
              <div className="mb-3">
                <label htmlFor="F_name" className="form-label">FIRST NAME</label>
                <input
                  name="F_name"
                  value={input.F_name}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="F_name"
                />
                {errors.F_name && <div style={{ color: 'red' }}>{errors.F_name}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="L_name" className="form-label">LAST NAME</label>
                <input
                  name="L_name"
                  value={input.L_name}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="L_name"
                />
                {errors.L_name && <div style={{ color: 'red' }}>{errors.L_name}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="images">PHOTOGRAPHER PHOTO</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="form-control-file"
                />
                {errors.images && <div style={{ color: 'red' }}>{errors.images}</div>}
              </div>

              {input.images.length > 0 && (
                <div>
                  <h6>Selected Images:</h6>
                  <ul>
                    {input.images.map((image, index) => (
                      <li key={index}>{image.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">EMAIL</label>
                <input
                  name="Email"
                  value={input.Email}
                  onChange={handleInputChange}
                  type="email"
                  className="form-control"
                  id="Email"
                />
                {errors.Email && <div style={{ color: 'red' }}>{errors.Email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="Phone" className="form-label">PHONE</label>
                <input
                  name="Phone"
                  value={input.Phone}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="Phone"
                />
                {errors.Phone && <div style={{ color: 'red' }}>{errors.Phone}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="Address" className="form-label">ADDRESS</label>
                <input
                  name="Address"
                  value={input.Address}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                  id="Address"
                />
                {errors.Address && <div style={{ color: 'red' }}>{errors.Address}</div>}
              </div>
            </div>
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-success me-5">SUBMIT</button>
            <Link to={"/"}><button className="btn btn-danger">CANCEL</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Insert;
