import React, { useContext, useState } from "react"; // Import useState hook
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import './Style/Home.css';



function Admindash() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const Logout = () => {
    setUser(null);
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const adminnav = (
    <div>
      <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <div className="dropdown">
            <Link
              className=" nav-item nav-link dropdown-toggle custom-link"
              type="button"
              id="dropdownMenuButton"
              onClick={toggleDropdown} // Add onClick event to toggle dropdown
              aria-haspopup="true"
              aria-expanded={dropdownOpen ? "true" : "false"} // Set aria-expanded based on dropdown state
            >
              Packages
            </Link>
            <div
              className={`dropdown-menu${dropdownOpen ? " show" : ""}`}
              aria-labelledby="dropdownMenuButton"
            >
              <Link to="/editalbum" className="dropdown-item">
                ADD STANDARD PACKAGE
              </Link>
              <Link to="/editPromo" className="dropdown-item">
                ADD PROMO PACKAGE
              </Link>
              
            </div>
          </div>
          <Link
            to="/bookingdetail"
            className="nav-item nav-link custom-link"
            id="nav-contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Booking Details
          </Link>
          {/* <Link
            to="/allcus"
            className="nav-item nav-link custom-link"
            id="nav-contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Customers Details
          </Link> */}
          <Link
            to="/InventoryMnagement"
            className="nav-item nav-link custom-link" 
            id="nav-contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Inventory
          </Link>
          <Link
            to="/emp"
            className="nav-item nav-link custom-link" 
            id="nav-contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Employee
          </Link>
          <Link
            to="/FeedbackOptions"
            className="nav-item nav-link custom-link" 
            id="nav-contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Feedback
          </Link>
          <Link
            to="/supplierHome"
            className="nav-item nav-link custom-link" 
            id="nav-contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            supplier
          </Link>
          <Link
            to="/PhotographerHome"
            className="nav-item nav-link custom-link" 
            id="nav-contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Photographer
          </Link>
          <Link
            to="/FinanceManagement"
            className="nav-item nav-link custom-link" 
            id="nav-contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Revenue
          </Link>
          <Link
            to="/ViewPayment"
            className="nav-item nav-link custom-link" 
            id="nav-contact-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Payments
          </Link>
          
         

        </div>
      </nav>
      
      <button
        className="btn nav-link"
        onClick={Logout}
        style={{ position: "absolute", top: "25px", right: "15px" }}
      >
        Logout
      </button>
    </div>
  );

  const backgroundimage = {
    background: `url('./Images/back10.jpg')`,
    backgroundsize: "cover",
    backgroundposition: "center",
    backgroundrepeat: "no-repeat",
    width: "100%",
    height: "100vh",
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark text-center">
        <ul className="navbar-nav mx-auto">
          {user ? (
            <li className="nav-item">
              {user.Email === "Admin@gmail.com" ? (
                <div style={{ position: "left" }}>
                  {adminnav}
                  <Link
                    className="nav-link"
                    to="/Admindash"
                    style={{ position: "absolute", top: "0", right: "0" }}
                  ></Link>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  <Link
                    className="nav-link"
                    to="/Cusdash"
                    style={{ position: "absolute", top: "0", right: "0" }}
                  ></Link>
                </div>
              )}
            </li>
          ) : null}
          <li className="nav-item">
            {user ? (
              <button
                className="btn nav-link"
                onClick={Logout}
                style={{ position: "absolute", top: "25px", right: "15px" }}
              >
                Logout
              </button>
            ) : (
              <div>
                {adminnav}
                <Link className="nav-link" to="/Admindash"></Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <div style={backgroundimage}></div>
    </div>
  );
}

export default Admindash;
