import React, { useEffect, useState } from "react";
//import "./financeManagement.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";

export default function FinanceManagement() {
  const navigate = useNavigate();
  const [finance, setFinance] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/transactions/trans")
      .then((response) => {
        const financeData = response.data;

        let incomeTotal = 0;
        let expenseTotal = 0;

        financeData.forEach((transaction) => {
          if (transaction.type === "Income") {
            incomeTotal += transaction.amount;
          } else if (transaction.type === "Expenses") {
            expenseTotal += transaction.amount;
          }
        });

        setTotalIncome(incomeTotal);
        setTotalExpense(expenseTotal);
        setBalance(incomeTotal - expenseTotal);
        setFinance(financeData);
      })
      .catch((err) => console.error("Error fetching finance data:", err));
  }, []);

  const handleDelete = (id, reference) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${reference}"?`
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:8070/transactions/delete/${id}`)
        .then((res) => {
          console.log("Delete successful:", res);
          window.location.reload();
        })
        .catch((err) => console.error("Error deleting transaction:", err));
    }
  };

  const addTransactionClick = () => {
    navigate("/AddTransaction");
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.get("http://localhost:8070/transactions/trans");
      const financeData = response.data;

      const doc = new jsPDF();

      const headerX = doc.internal.pageSize.width - 20;

      doc.setFontSize(14);
      doc.text("Sai Photography", headerX, 20, { align: "right" });

      doc.setFontSize(12);
      doc.text(" Malabe, Colombo 07", headerX, 27, { align: "right" });
      doc.setFontSize(10);
      doc.text("077-123456", headerX, 32, { align: "right" });

      doc.setLineWidth(0.5);
      doc.line(8, 42, 200, 42);

      doc.setFont("bold");
      doc.setFontSize(20);
      doc.text("Financial Details", 80, 60);
      doc.setFont("normal");

      doc.setDrawColor(0);

      const columns = [
        { header: "ID", dataKey: "index" },
        { header: "Description", dataKey: "description" },
        { header: "Amount", dataKey: "amount" },
        { header: "Type", dataKey: "type" },
        { header: "Date", dataKey: "date" },
        { header: "Reference", dataKey: "reference" },
      ];

      const rows = financeData.map((finance, index) => ({
        index: index + 1,
        description: finance.description,
        amount: finance.amount,
        type: finance.type,
        date: finance.date,
        reference: finance.reference,
      }));

      autoTable(doc, { columns, body: rows, startY: 70 });

      const totalIncome = financeData.reduce((total, finance) => {
        return finance.type === "Income" ? total + finance.amount : total;
      }, 0);

      const totalExpenses = financeData.reduce((total, finance) => {
        return finance.type === "Expenses" ? total + finance.amount : total;
      }, 0);

      const balance = totalIncome - totalExpenses;

      doc.setFontSize(11);
      doc.text(
        `Total Income: LKR ${totalIncome}`,
        15,
        doc.autoTable.previous.finalY + 10
      );
      doc.text(
        `Total Expenses: LKR ${totalExpenses}`,
        15,
        doc.autoTable.previous.finalY + 18
      );
      const balanceX = doc.internal.pageSize.width - 15;
      doc.text(
        `Balance: LKR ${balance}`,
        balanceX,
        doc.autoTable.previous.finalY + 15,
        { align: "right" }
      );

      doc.save("Finance report.pdf");
    } catch (error) {
      console.error("Error fetching or generating PDF:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredFinance = finance.filter((transaction) =>
    transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div >
      
      <div className="card" style={{ backgroundImage: 'url("Images/back2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <Navbar/>
        <div className="card-header">
          <h1 className="card-title" style={{  color: 'black', borderRadius: '5px' }}>Income & Expenses</h1>
          <div className="d-flex justify-content-between">
            <button
              onClick={addTransactionClick}
              style={{ backgroundColor: '#053F5C', color: 'white', borderRadius: '5px' }}
            // Add margin bottom to the button
            >
              Add new transaction
            </button>
            <button
              onClick={downloadPDF}
              className="btn btn-secondary finance-report-button"
              style={{ marginBottom: '10px' }} // Add margin bottom to the button
            >
              Finance report
            </button>
          </div>
        </div>
        <div className="card-body">
        <div className="row">
  <div className="col">
    <div className="finance-summary">
      <h5>Balance</h5>
      <p className={balance >= 0 ? "text-success" : "text-danger"}>
        LKR {balance}
      </p>
    </div>
  </div>
  <div className="col">
    <div className="finance-summary">
      <h5>Income</h5>
      <p>LKR {totalIncome}</p>
    </div>
    <div className="finance-summary">
      <h5>Expenses</h5>
      <p>LKR {totalExpense}</p>
    </div>
  </div>
</div>

          <input
            type="text"
            placeholder="Search by type"
            value={searchQuery}
            onChange={handleSearch}
            className="form-control mb-3"
            style={{ marginBottom: '20px' }} // Add margin bottom to the input field
          />
          <table className="table">
            <thead>
              <tr style={{ backgroundColor: '#053F5C', color: 'white' }}>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Reference</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {filteredFinance.map((finance, index) => {
    // Determine background color based on odd/even index
    const rowStyle = index % 2 === 0 ? { backgroundColor: '#F0EDE5' } : { backgroundColor: '#FFFFFF' };

    return (
      <tr key={finance.id} style={rowStyle}>
        <td>{index + 1}</td>
        <td>{finance.description}</td>
        <td>{finance.amount}</td>
        <td>{finance.type}</td>
        <td>{finance.date}</td>
        <td>{finance.reference}</td>
        <td>
          <Link to={`/UpdateTransactions/${finance._id}`}>
            <button className="btn btn-primary" style={{ marginRight: '5px' }}>Edit</button>
          </Link>
          <button
            onClick={(e) => handleDelete(finance._id, finance.reference)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
