import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './../Style/Home.css';

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navLinkStyle = {
    color: "white",
    marginLeft: "25px",
    marginRight: "20px",
    textDecoration: "none",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    background: `url('./Images/back5.jpg')`,
    backgroundPosition: "left",
    backgroundSize: "50%",
    height: "650px",
  };

  const leftOverlayStyle = {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  };

  const rightOverlayStyle = {
    flex: 1,
    backgroundColor: "#DAC6B3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const formContainerStyle = {
    width: "400px",
  };

  const navContainerStyle = {
    position: "absolute",
    top: "30px",
    right: "20px",
    zIndex: "1",
    display: "flex",
    alignItems: "center",
  };

  const signUpTextStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const navigate = useNavigate();

  function sentSignUpData(e) {
    e.preventDefault();

    const userNew = {
      Email: email,
      UserName: username,
      Password: password
    };

    axios.post("http://localhost:8070/webuser/register", userNew)
      .then(() => {
        alert("Successfully Registered");
        navigate("/connect");
      })
      .catch((err) => {
        alert(err.response.data.message); // Display error message from backend
      });
  }

  return (
    <div>
      <header style={headerStyle}>
        <div style={leftOverlayStyle}></div>
        <div style={rightOverlayStyle}>
          <div style={formContainerStyle}>
            <form onSubmit={sentSignUpData}>
              <p style={signUpTextStyle}>SIGN UP</p>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputUsername">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <Link to="/connect">Already have an account? Log in</Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#A38469", width: "400px", alignContent: "center" }}
              >
                Sign Up
              </button>

              <div className="form-group">
                <hr></hr>
                <small className="form-text text-muted" style={{ textAlign: "center" }}>
                  2023 © ALL RIGHTS RESERVED
                </small>
              </div>
            </form>
          </div>
        </div>
        <nav style={navContainerStyle}>
          <a href="/" style={navLinkStyle}>Back</a>
        </nav>
      </header>
    </div>
  );
}

export default SignUp;
