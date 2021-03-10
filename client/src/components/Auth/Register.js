import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";
import { register } from "./registerSlicer";

toast.configure();

const Register = () => {
  const disptch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const { firstName, lastName, email, password, verifyPassword } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== verifyPassword) {
      toast.error("passwords do not match");
      console.log(toast);
    } else {
      disptch(register({ firstName, lastName, email, password }));
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        verifyPassword: "",
      });
    }
  };

  return (
    <div className="loginLogoutBody">
      <div className="loginCard">
        <h1>Register</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Your first name.."
            value={firstName}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Your last name.."
            value={lastName}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password.."
            value={password}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="verifyPassword">Verify Password</label>
          <input
            type="password"
            id="verifyPassword"
            name="verifyPassword"
            placeholder="Your password.."
            value={verifyPassword}
            onChange={(e) => handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
        <p>
          Already have an account? <Link to="/login">Log in</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
