import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginSelector } from "../Auth/loginSlicer";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuth, isLoading } = useSelector(loginSelector);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth && !isLoading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
