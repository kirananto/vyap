import React from "react";
import { Route, Redirect } from "react-router-dom";

// import { UserContext } from "./UserProvider";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  // const { user, profile } = useContext(UserContext);
  const user = true
  const profile = true
  return (
    <Route
      {...rest}
      render={(props) =>
        typeof user !== "undefined" && user !== null && typeof profile !== "undefined" && profile !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;