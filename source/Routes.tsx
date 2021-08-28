import React, { useContext } from "react";
import { Link, Route, Switch } from "react-router-dom";

import { Home } from "./Home/Home";
import { Profile } from "./Profile";
import Login from "./Login/Login";
// import ProtectedRoute from "./Firebase/ProtectedRoute";
import { UserContext } from "./Firebase/UserProvider";
import { Payment } from "./Payment/Payment";
import PaymentDetails from "./Payment/PaymentDetails";
import Reports from "./Reports/Reports";
import Employees from "./Employees/Employees";
import LoginRoutes from "./Firebase/LoginRoutes";
import StockManagement from "./StockManagement/StockManagement";
import Signup from "./Signup/Signup";
import Settings from "./Settings/Settings";

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
            <Route path="/payment-details" component={PaymentDetails} />
            <Route path="/reports" component={Reports} />
            <Route path="/employees" component={Employees} />
            <Route path="/stock-management" component={StockManagement} />
            <Route path="/settings" component={Settings} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/" component={Home} />
            <Route>
              <div>
                404 page Please go to home
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
