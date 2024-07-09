import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Sup_details() {
  const [render] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get('http://localhost:8070/api/v1/sup');
      setSuppliers(res.data);
    };
    getAllData();
  }, [render]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8070/api/v1/sup/search?F_name=${value}`);
      setSuppliers(res.data);
      setValue('');
    } catch (error) {
      console.log(error);
    }
  };

 

  const CompanyLogo = () => {
    return (
      <div className='header'>
        <img src='./Icon.jpeg' alt="icon" style={{ maxWidth: '00%', height: 'auto' }} />
        <p>SAI PHOTOGRAPHY<br></br>
          Malabe,<br></br>
          Colombo
        </p>
      </div>
    );
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.get("http://localhost:8070/api/v1/sup");
      const suppliersData = response.data;

      const doc = new jsPDF();

      const headerX = doc.internal.pageSize.width - 20;

      doc.setFontSize(14);
      doc.text("Sai Photography", headerX, 20, { align: "right" });

      doc.setFontSize(12);
      doc.text(" Colombo, Malabe", headerX, 27, {
        align: "right",
      });
      doc.setFontSize(10);
      doc.text("077-1234567", headerX, 32, {
        align: "right",
      });

      doc.setLineWidth(0.5);
      doc.line(8, 42, 200, 42);

      doc.setFont("bold");
      doc.setFontSize(20);
      doc.text("Supplier Report", 80, 60);
      doc.setFont("normal");

      doc.setDrawColor(0);

      const columns = [
        { header: "ID", dataKey: "id" },
        { header: "First Name", dataKey: "F_name" },
        { header: "Last Name", dataKey: "L_name" },
        { header: "Email", dataKey: "Email" },
        { header: "Phone", dataKey: "Phone" },
        { header: "Address", dataKey: "Address" },
        { header: "Products", dataKey: "type" },
      ];

      const rows = suppliersData.map((supplier, index) => ({
        id: index + 1,
        F_name: supplier.F_name,
        L_name: supplier.L_name,
        Email: supplier.Email,
        Phone: supplier.Phone,
        Address: supplier.Address,
        type: supplier.type,
      }));

      doc.autoTable({ columns, body: rows, startY: 70 });

      doc.save("Supplier_Report.pdf");
    } catch (error) {
      console.error("Error fetching or generating PDF:", error);
    }
  };

  return (
    <div style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <Navbar />
      <div className='container' style={{ backgroundColor: "#E5E5E5" }}>
        <form className="d-flex" role="search" onSubmit={handleSearch}>
          <input className="form-control me-2" type="search" placeholder="Supplier's Name"
            aria-label="Search" value={value} onChange={(e) => setValue(e.target.value)} />
          <button className="btn btn-outline-success" type="submit">SEARCH</button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        
          <button style={{ backgroundColor: '#130518', color: 'white', marginLeft: '10px' }} onClick={downloadPDF}>DOWNLOAD PDF</button>
        </div>

        <div  style={{ width: '100%' }}>
          <CompanyLogo />
          <br></br>
          <h2 className="text-center"><b>ALL SUPPLIER DETAILS</b></h2>
          <br></br>
          <br></br>
          <table class="table">
            <thead>
              <tr style={{ backgroundColor: '#053F5C', color: 'white' }}>
                <th scope="col">ID</th>
                <th scope="col">FIRSTNAME</th>
                <th scope="col">LASTNAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">PHONE</th>
                <th scope="col">ADDRESS</th>
                <th scope="col">PRODUCTS</th>
              </tr>
            </thead>
            <tbody>
              {suppliers && suppliers.map((supplier, index) => {
                const rowStyle = index % 2 === 0 ? { backgroundColor: '#F0EDE5' } : { backgroundColor: '#FFFFFF' };
                return (
                  <tr key={supplier._id} style={rowStyle}>
                    <td>{index + 1}</td>
                    <td>{supplier.F_name}</td>
                    <td>{supplier.L_name}</td>
                    <td>{supplier.Email}</td>
                    <td>{supplier.Phone}</td>
                    <td>{supplier.Address}</td>
                    <td>{supplier.type}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Sup_details;
