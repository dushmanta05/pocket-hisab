import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// const apiBaseUrl = process.env.BASE_URL;

const Register = () => {
  const [formData, setformData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("password do not match!");
      setSuccessMessage("");
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/user/register`,
        formData
      );
      if (response.status === 200 || response.status === 201) {
        setErrorMessage("");
        setSuccessMessage("Registration successful");
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage("registrain faield");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
            />
          </div>

          <div>
            <label>Fullname</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter Your Full name"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <p style={{ color: "red" }}>{errorMessage}</p>
            <p style={{ color: "green" }}>{successMessage}</p>
          </div>
          <div className="submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
