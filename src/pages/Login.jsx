import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";

const Login = () => {
  

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors,setErrors] = useState({}) ;
  const navigate =useNavigate();
  const validate = () => {
    const newErrors = {};
    
    if(!formData.email.trim()){
      newErrors.email ="Email is required"
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
      newErrors.email="invalid email format"
    }
  
    if (!formData.password.trim()) {
      newErrors.password = "password is required"
    } else if (formData.password.length<6) {
      newErrors.password ="Minimum 6 character required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length===0;
  }
  const handleInputChange = (e) => {
   
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
     setErrors({
      ...Error,
      [e.target.name]:""
    })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = JSON.parse(localStorage.getItem("authData"));
      if (
        data &&
        data.email=== formData.email&&
        data.password===formData.password
      ) {
        alert("Login successful");
        navigate("/dashboard");
        
      }else{
        alert("Invalid email or password");
      }
      
    }
  
  };
  
  return (
    <div className="form-container">
    
      <h1 className="form-title">LOGIN</h1>

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
          {errors.email &&<span className="error-msg">{errors.email}</span>}
        </div>

        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleInputChange}
          />
          {errors.password &&(
            <span className="error-msg">{errors.password}</span>)}

        </div>
        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      <p className="link-text">
        Don,t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;