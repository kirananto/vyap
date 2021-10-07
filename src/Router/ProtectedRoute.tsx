import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";

// import { UserContext } from "./UserProvider";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { user, token } = useSelector(selectCredentials);

  return (
    <Route
      {...rest}
      render={(props) =>
        user !== undefined && token !== undefined ? (
          <Component {...props} />
        ) : (<Redirect to="/login" />)
      }
    />
  );
};

export default ProtectedRoute;