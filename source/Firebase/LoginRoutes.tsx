import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "./UserProvider";

const LoginRoutes = ({ component: Component, ...rest }: any) => {
  const { user, profile } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        typeof user !== "undefined" && user !== null && typeof profile !== "undefined" && profile !== null ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default LoginRoutes;
