import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import './../Style/Home.css';

function LogIn() {
  const navLinkStyle = {
    color: "white",
    marginLeft: "25px", 
    marginRight: "20px", 
    textDecoration: "none",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    background: `url('./Images/back6.jpg')`, 
    backgroundPosition: "left", 
    backgroundSize: "49.5%", 
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
  const{ setUser } = useContext(UserContext);

  const[Email,setEmail2] = useState("");
  const[Password,setPassword2] = useState("");

  async function handlesubmit(e){
    e.preventDefault();

  
    if (Email === "admin@gmail.com" && Password === "admin") {
     
      localStorage.setItem("username", "Admin");
      localStorage.setItem("Email", "admin@gmail.com");

      
      navigate("/AdminDashboard");
    } else {
      
      const newlogIn = {
        Email,
        Password
      };

      try {
        const userResponse = await axios.post(
          "http://localhost:8070/webuser/get/login",
          newlogIn
        );

        if (userResponse.status === 200) {
          const responseData = userResponse.data;

          if (responseData.username) {
           
            localStorage.setItem("username", responseData.username);
            localStorage.setItem("id", responseData.id);
            localStorage.setItem("Email", responseData.Email);

           
            console.log("login success");

           
            navigate("/Cusdash");
          } else {
            console.log("Invalid login");
            alert("Invalid login");
          }
        } else {
          console.log("Error:", userResponse.statusText);
          alert("Error:", userResponse.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
      

    return (
      <div>
        <header style={headerStyle}>
          <div style={leftOverlayStyle}></div>
          <div style={rightOverlayStyle}>
            <div style={formContainerStyle}>

              <form >
                <p style={signUpTextStyle}>Welcome Back</p>

                  <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email" onChange={(e) =>setEmail2(e.target.value)}/>
                  </div>

                  <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="At least 6 characters" onChange={(e) => setPassword2(e.target.value)}/>
                  </div>

                  <div className="mb-3">
                    <Link to= "/signup" >Don't you have an account?</Link>
                  </div>
          
                  <button type="submit" className="btn btn-primary" 
                  style={{backgroundColor:"#A38469",width:"400px", alignContent:"center"}} onClick={handlesubmit} >
                      Log In
                  </button>

                  <div className="form-group">
                      <hr></hr>
                      <small className="form-text text-muted" style={{textAlign:"center"}}>
                      2024 © ALL RIGHTS RESERVED</small>
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
export default LogIn;
