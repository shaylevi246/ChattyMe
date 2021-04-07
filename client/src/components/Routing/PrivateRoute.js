import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginSelector } from "../Auth/loginSlicer";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      dispatch(loadUser());
    }
  }, [dispatch]);
  const { isAuth, isLoading } = useSelector(loginSelector);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth && isLoading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
