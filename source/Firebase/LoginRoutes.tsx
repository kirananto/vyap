import { selectCredentials } from "../Pages/Login/credentialsSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// import { UserContext } from "./UserProvider";

const LoginRoutes = ({ component: Component, ...rest }: any) => {
  const { user, token } =  useSelector(selectCredentials);
  return (
    <Route
      {...rest}
      render={(props) =>
        user !== undefined && token !== undefined ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default LoginRoutes;
