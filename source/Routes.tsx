import React, { useContext } from "react";
import { Link, Route, Switch } from "react-router-dom";

import { Home } from "./Home/Home";
import { Profile } from "./Profile";
import Login from "./Login/Login";
// import ProtectedRoute from "./Firebase/ProtectedRoute";
import { UserContext } from "./Firebase/UserProvider";
import { Payment } from "./Payment/Payment";
import LoginRoutes from "./Firebase/LoginRoutes";
import Signup from "./Signup/Signup";

function Routes() {
  const { user } = useContext(UserContext);

  console.log("---------------- ROUTES: ", user);

  return (
    <>
      {typeof user !== "undefined" ? (
        <>
          <Switch>
            <LoginRoutes path="/login" component={Login} />
            <LoginRoutes path="/signup" component={Signup} />
            <Route path="/payment" component={Payment} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/" component={Home} />
            <Route>
              <div> 
                  404 page 
                  Please go to home
                  <Link to="/home">Home</Link>
              </div>
            </Route>
          </Switch>
        </>
      ) : (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      )}
    </>
  );
}

export default Routes;
