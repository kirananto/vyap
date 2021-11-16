import React from "react";
import { Route, Routes } from "react-router";

import { Home } from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Payment } from "./Pages/ChatView";
import PaymentDetails from "./Pages/ChatView/PaymentDetails";
import Reports from "./Pages/Reports/Reports";
import Employees from "./Pages/Employees/Employees";
import StockManagement from "./Pages/StockManagement/StockManagement";
import OrderDetails from "./Pages/Orders/OrderView";
// ! SIGNUP----->
import SignupStepOne from "./Pages/Signup/SignupStepOne";
import SignupStepThree from "./Pages/Signup/SignupStepTwo";
import SignupStepFour from "./Pages/Signup/SignupStepThree";
import SignupStepFive from "./Pages/Signup/SignupStepFour";
import Settings from "./Pages/Settings/Settings";
import More from "./Pages/More/More";
import Orders from "./Pages/Orders";
import Product from "./Pages/Product";
import AddProductMain from "./Pages/Product/AddProduct/MainScreen/AddProductMain";
import Account from "./Pages/Account";
import AllPayments from "./Pages/Payments";
import PurchaseOrder from "./Pages/StockManagement/PurchaseOrder";
import AddEditPurchase from "./Pages/StockManagement/PurchaseOrder/AddEditPurchase";
import CreateProduct from "./Pages/Product/AddProduct/ProductScreen/CreateProduct";
import PlaceOrder from "./Pages/ChatView/PlaceOrder";
import AddItem from "./Pages/ChatView/PlaceOrder/AddItem";
import PageNotFound from "./Pages/404NotFound";
import { RequiredAuth } from './Router/RequiredAuth'
import { UnAuthenticated } from "./Router/UnAuthenticated";


function RouterComp() {
  return (
    <Routes>
      <Route path="/login" element={<UnAuthenticated><Login /></UnAuthenticated>} />
      <Route path="/signup" element={<UnAuthenticated><SignupStepOne /></UnAuthenticated>} />
      <Route path="/signup-step-2" element={<UnAuthenticated><SignupStepThree /></UnAuthenticated>} />
      <Route path="/signup-step-3" element={<UnAuthenticated><SignupStepFour /></UnAuthenticated>} />
      <Route path="/signup-step-4" element={<UnAuthenticated><SignupStepFive /></UnAuthenticated>} />
      <Route path="/chat/:id" element={<RequiredAuth><Payment /></RequiredAuth>} />
      <Route path="/payment/:id" element={<RequiredAuth><PaymentDetails /></RequiredAuth>} />
      <Route path="/reports" element={<RequiredAuth><Reports /></RequiredAuth>} />
      <Route path="/employees" element={<RequiredAuth><Employees /></RequiredAuth>} />
      <Route path="/stock-management" element={<RequiredAuth><StockManagement /></RequiredAuth>} />
      <Route path="/my-products" element={<RequiredAuth><Product /></RequiredAuth>} />
      <Route path="/add-product" element={<RequiredAuth><AddProductMain /></RequiredAuth>} />
      <Route path="/settings" element={<RequiredAuth><Settings /></RequiredAuth>} />
      <Route path="/create-product" element={<RequiredAuth><CreateProduct /></RequiredAuth>} />
      <Route path="/more" element={<RequiredAuth><More /></RequiredAuth>} />
      <Route path="/home" element={<RequiredAuth><Home /></RequiredAuth>} />
      <Route path="/" element={<RequiredAuth><Home /></RequiredAuth>} />
      <Route path="/orders" element={<RequiredAuth><Orders /></RequiredAuth>} />
      <Route path="/my-account" element={<RequiredAuth><Account /></RequiredAuth>} />
      <Route path="/all-payments" element={<RequiredAuth><AllPayments /></RequiredAuth>} />
      <Route path="/purchase-order" element={<RequiredAuth><PurchaseOrder /></RequiredAuth>} />
      <Route path="/purchase-order/new" element={<RequiredAuth><AddEditPurchase /></RequiredAuth>} />
      <Route path="/purchase-order/:id" element={<RequiredAuth><AddEditPurchase /></RequiredAuth>} />
      <Route path="/order/:id" element={<RequiredAuth><OrderDetails /></RequiredAuth>} />
      <Route path="/place-order" element={<RequiredAuth><PlaceOrder /></RequiredAuth>} />
      <Route path="/place-order/add-item" element={<RequiredAuth><AddItem /></RequiredAuth>} />
      <Route element={<PageNotFound />} />
    </Routes>
  );
}

export default RouterComp;
