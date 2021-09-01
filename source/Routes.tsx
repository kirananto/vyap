import React, { useContext } from "react";
import { Link, Route, Switch } from "react-router-dom";

import { Home } from "./Pages/Home/Home";
import { Profile } from "./Profile";
import Login from "./Pages/Login/Login";
// import ProtectedRoute from "./Firebase/ProtectedRoute";
import { UserContext } from "./Firebase/UserProvider";
import { Payment } from "./Pages/Payment/Payment";
import PaymentDetails from "./Pages/Payment/PaymentDetails";
import Reports from "./Pages/Reports/Reports";
import Employees from "./Pages/Employees/Employees";
import LoginRoutes from "./Firebase/LoginRoutes";
import StockManagement from "./Pages/StockManagement/StockManagement";
// ! SIGNUP----->
import SignupStepOne from "./Pages/Signup/SignupStepOne";
import SignupStepTwo from "./Pages/Signup/SignupStepTwo";
import Settings from "./Pages/Settings/Settings";
import More from "./Pages/More/More";

function Routes() {
  const { user } = useContext(UserContext);

  console.log("---------------- ROUTES: ", user);

  return (
    <>
      {typeof user !== "undefined" ? (
        <>
          <Switch>
            <LoginRoutes path="/login" component={Login} />
            <LoginRoutes path="/signup-step-1" component={SignupStepOne} />
            <LoginRoutes path="/signup-step-2" component={SignupStepTwo} />
            <Route path="/payment" component={Payment} />
            <Route path="/payment-details" component={PaymentDetails} />
            <Route path="/reports" component={Reports} />
            <Route path="/employees" component={Employees} />
            <Route path="/stock-management" component={StockManagement} />
            <Route path="/settings" component={Settings} />
            <Route path="/more" component={More} />
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
