import React from "react";
import { Route, Redirect } from "react-router-dom";
// import {isLogin} from "../../actions/userActions"

const PrivateRoute = ({ component: Component, ...props }) => {
  const isAuth = localStorage.getItem("token");

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...props}
      render={(props) =>
        isAuth ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <>
            <Redirect to="/login" />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
