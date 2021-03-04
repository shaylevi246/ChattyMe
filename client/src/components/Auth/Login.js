import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { login, loginSelector } from "./loginSlicer";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(loginSelector);
  const history = useHistory();
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
  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth, history]);
  return (
    <div className="center">
      <div className="loginCard">
        <h1>Sign In</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <label for="email">Email</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="Your email.."
          />

          <label for="password">Password</label>
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
  );
};

export default Login;
