import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginSelector } from "../Auth/loginSlicer";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector(loginSelector);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
