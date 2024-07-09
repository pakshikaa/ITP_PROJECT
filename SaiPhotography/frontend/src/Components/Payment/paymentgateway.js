import React, { useState, useEffect } from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import axios from "axios";


export default function Payment() {
    const [cash, setCash] = useState("");
    const [bank, setBank] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);
    const [pays, setPays] = useState([]);
    const [apiurl, setApiUrl] = useState("http://localhost:8070/payment");
    const [userEmail, setUserEmail] = useState(null);
    
  const [albums, setAlbums] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8070/packagesweb/getdetails')
      .then((response) => {
        setAlbums(prevAlbums => [...prevAlbums, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
      });

    axios.get('http://localhost:8070/promopackagesweb/getdetail')
      .then((response) => {
        setAlbums(prevAlbums => [...prevAlbums, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching promo packages:', error);
      });
  }, []);

    const handleSubmit = () => {
        if (cash.trim() !== '' && bank.trim() !== '' && date.trim() !== '') {
            if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(cash)) {
                setError("Cash must be a valid amount in rupees");
                return;   
            }
            if (!/^[A-Za-z\s]+$/.test(bank)) {
                setError("Bank name must include only letters and spaces");
                return;
            }
            const formData = new FormData();
            formData.append('cash', cash);
            formData.append('bank', bank);
            formData.append('date', date);
            formData.append('image', image);
            formData.append('Email',userEmail)

            fetch(apiurl + "/create", {
                method: "POST",
                body: formData
            }).then((res) => {
                if (res.ok) {
                    setPays([...pays, { cash, bank, date, image ,userEmail}]);
                    setMessage("Payment success");
                    setTimeout(() => {
                        setMessage("");
                    }, 3000);
                } else {
                    setError("Unable to create item");
                }
            });
        } else {
            setError("All fields are required");
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
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
    }, []);
    useEffect(() => {
        const getUserEmail = () => {
          const userEmail = localStorage.getItem("Email");
          setUserEmail(userEmail); // Set user email state
        };
    
        getUserEmail();
      }, []);
    

    return (
        <div>
            <div className="row">
                <h3 className="text-center">Add payment</h3>
                {message && <p className="text-success">{message}</p>}
                <div className="form-group gap-2">
                    <input placeholder="Cash (in rupees)" value={cash} onChange={(e) => setCash(e.target.value)} className="form-control" type="text" />
                    <input placeholder="Bank" value={bank} onChange={(e) => setBank(e.target.value)} className="form-control" type="text" />
                    <input placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" type="date" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
                    <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );
}
