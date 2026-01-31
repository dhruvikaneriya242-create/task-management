import React from "react";
import "./Register.css"
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="form-container">
            <h1>Register</h1>
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                />
                </div>
                
               <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                />
                </div>
                <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone name"
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="paassword"
                name="password"
                placeholder="Enter your password "
                />
                </div>
               <div>
               <button type="submit" className="btn-primary">Register</button>
            
              </div>
            </form>
            <p className="link-text">
              Alreay have an account?<Link to="/login">Login</Link>
            </p>

      </div>
    </>
  );
};

export default Register;
