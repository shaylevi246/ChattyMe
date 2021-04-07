import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { login, loginSelector } from "./loginSlicer";
import { Fragment } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(loginSelector);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  if (isAuth) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="loginLogoutBody">
        <div className="loginCard">
          <h1>Sign In</h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder="Your email.."
            />

            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => handleChange(e)}
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Your password.."
            />

            <input type="submit" value="Submit" />
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>{" "}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
