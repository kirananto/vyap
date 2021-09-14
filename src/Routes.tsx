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
import SignupStepOne from "./Pages/Signup/SignupStepOne";
import SignupStepTwo from "./Pages/Signup/SignupStepTwo";
import SignupStepThree from "./Pages/Signup/SignupStepThree";
import SignupStepFour from "./Pages/Signup/SignupStepFour";
import SignupStepFive from "./Pages/Signup/SignupStepFive";
import Settings from "./Pages/Settings/Settings";
import More from "./Pages/More/More";
import { useSelector } from "react-redux";
import { selectCredentials } from "./Pages/Login/credentialsSlice";
import Orders from "./Pages/Orders";
import Product from "./Pages/Product/Product";
import AddProductMain from "./Pages/Product/AddProduct/MainScreen/AddProductMain";
import Account from "./Pages/Account";
import AllPayments from "./Pages/Payments";
import PurchaseOrder from "./Pages/StockManagement/PurchaseOrder";
import AddEditPurchase from "./Pages/StockManagement/PurchaseOrder/AddEditPurchase";

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
            {/* ===Signup=== */}
            <LoginRoutes path="/signup-step-1" component={SignupStepOne} />
            <LoginRoutes path="/signup-step-2" component={SignupStepTwo} />
            <Route path="/signup-step-3" component={SignupStepThree} />
            <Route path="/signup-step-4" component={SignupStepFour} />
            <Route path="/signup-step-5" component={SignupStepFive} />
            {/* ===Signup=== */}
            <Route path="/chat/:id" component={Payment} />
            <Route path="/payment/:id" component={PaymentDetails} />
            <Route path="/reports" component={Reports} />
            <Route path="/employees" component={Employees} />
            <Route path="/stock-management" component={StockManagement} />
            <Route path="/my-products" component={Product} />
            <Route path="/add-product-main" component={AddProductMain} />
            <Route path="/settings" component={Settings} />
            <Route path="/more" component={More} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/my-account" component={Account} />
            <Route exact path="/all-payments" component={AllPayments} />
            <Route exact path="/purchase-order" component={PurchaseOrder} />
            <Route exact path="/purchase-order/new" component={AddEditPurchase} />
            <Route exact path="/purchase-order/:id" component={AddEditPurchase} />
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
