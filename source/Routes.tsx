import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import { Home } from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Payment } from "./Pages/ChatView";
import PaymentDetails from "./Pages/ChatView/PaymentDetails";
import Reports from "./Pages/Reports/Reports";
import Employees from "./Pages/Employees/Employees";
import LoginRoutes from "./Router/LoginRoutes";
import StockManagement from "./Pages/StockManagement/StockManagement";
// ! SIGNUP----->
<<<<<<< HEAD
import SignupStepOne from "./Signup/SignupStepOne";
import SignupStepTwo from "./Signup/SignupStepTwo";
import SignupStepThree from "./Signup/SignupStepThree";
// ! SIGNUP----->
import Settings from "./Settings/Settings";
import More from "./More/More";
import Product from "./Product/Product";
=======
import SignupStepOne from "./Pages/Signup/SignupStepOne";
import SignupStepTwo from "./Pages/Signup/SignupStepTwo";
import Settings from "./Pages/Settings/Settings";
import More from "./Pages/More/More";
import { useSelector } from "react-redux";
import { selectCredentials } from "./Pages/Login/credentialsSlice";
>>>>>>> d27f10df88b1467aafd9c738da75685f387e2cb2

function Routes() {
  const user  = useSelector(selectCredentials);
  console.log('user', user)

  console.log("---------------- ROUTES: ", user.token);

  return (
    <>
      {typeof user !== "undefined" ? (
        <>
          <Switch>
            <LoginRoutes path="/login" component={Login} />
            <LoginRoutes path="/signup-step-1" component={SignupStepOne} />
            <LoginRoutes path="/signup-step-2" component={SignupStepTwo} />
<<<<<<< HEAD
            <LoginRoutes path="/signup-step-3" component={SignupStepThree} />
            <Route path="/payment" component={Payment} />
            <Route path="/payment-details" component={PaymentDetails} />
=======
            <Route path="/chat/:id" component={Payment} />
            <Route path="/payment/:id" component={PaymentDetails} />
>>>>>>> d27f10df88b1467aafd9c738da75685f387e2cb2
            <Route path="/reports" component={Reports} />
            <Route path="/employees" component={Employees} />
            <Route path="/stock-management" component={StockManagement} />
            <Route path="/my-products" component={Product} />
            <Route path="/settings" component={Settings} />
            <Route path="/more" component={More} />
            <Route exact path="/home" component={Home} />
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
