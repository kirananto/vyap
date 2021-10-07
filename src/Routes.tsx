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
import OrderDetails from "./Pages/Orders/OrderView";
// ! SIGNUP----->
import SignupStepOne from "./Pages/Signup/SignupStepOne";
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
import CreateProduct from "./Pages/Product/AddProduct/ProductScreen/CreateProduct";
import PlaceOrder from "./Pages/ChatView/PlaceOrder";
import AddItem from "./Pages/ChatView/PlaceOrder/AddItem";
import ProtectedRoute from "./Router/ProtectedRoute";
import PageNotFound from "./Pages/404NotFound";

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
            <LoginRoutes path="/signup" component={SignupStepOne} />
            <LoginRoutes path="/signup-step-2" component={SignupStepThree} />
            <LoginRoutes path="/signup-step-3" component={SignupStepFour} />
            <LoginRoutes path="/signup-step-4" component={SignupStepFive} />
            {/* ===Signup=== */}
            <ProtectedRoute path="/chat/:id" component={Payment} />
            <ProtectedRoute path="/payment/:id" component={PaymentDetails} />
            <ProtectedRoute path="/reports" component={Reports} />
            <ProtectedRoute path="/employees" component={Employees} />
            <ProtectedRoute path="/stock-management" component={StockManagement} />
            <ProtectedRoute path="/my-products" component={Product} />
            <ProtectedRoute path="/add-product" component={AddProductMain} />
            <ProtectedRoute path="/create-product" component={CreateProduct} />
            <ProtectedRoute path="/settings" component={Settings} />
            <ProtectedRoute path="/more" component={More} />
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/orders" component={Orders} />
            <ProtectedRoute exact path="/my-account" component={Account} />
            <ProtectedRoute exact path="/all-payments" component={AllPayments} />
            <ProtectedRoute exact path="/purchase-order" component={PurchaseOrder} />
            <ProtectedRoute exact path="/purchase-order/new" component={AddEditPurchase} />
            <ProtectedRoute exact path="/purchase-order/:id" component={AddEditPurchase} />
            <ProtectedRoute path="/order/:id" component={OrderDetails} />
            <ProtectedRoute exact path="/place-order" component={PlaceOrder} />
            <ProtectedRoute exact path="/place-order/add-item" component={AddItem} />
            <Route component={PageNotFound} />
          </Switch>
        </>
      ) : (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      )}
    </>
  );
}

export default Routes;
