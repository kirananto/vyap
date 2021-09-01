import React from "react";
import { SimpleHeader } from "../../Components/Header";
import {
  PaymentIcon,
  AllOrdersIcon,
  ReportsIcon,
  StockManagementIcon,
  MyAccountIcon,
  SettingsIcon,
  HelpIcon,
  OffersManagementIcon,
  LogoutIcon,
} from "./Icons/Payment";
import Links from "./Links";
import Tag from "./Tag";
import { Footer } from "../../Components/Footer";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Pages/Login/credentialsSlice";
import { useHistory } from "react-router-dom";

export default function More() {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(setCredentials({ user: undefined, token: undefined }))
    history.push('/login')
  }

  return (
    <div className="bg-white">
      <SimpleHeader heading="More" />

      <div className="flex flex-col items-center justify-center gap-2 py-5">
        <img
          src="../assets/img/profileimg.png"
          className="w-24 rounded-full"
          alt="profile-pic"
        />
        <h1 className="text-2xl font-bold text-gray-500">K&K Automobiles</h1>
      </div>
      {/* Menu */}
      {/* ----- */}
      <div className="flex flex-col gap-2 pl-10">
        <div className="flex items-center w-full gap-2 py-2 ">
          <PaymentIcon />
          <Links linkName="All Payments" />
        </div>
        {/* ----- */}
        {/* ----- */}
        <div className="flex items-center w-full gap-2 py-2 ">
          <AllOrdersIcon />
          <Links linkName="All Orders" />
        </div>
        {/* ----- */}
        {/* ----- */}
        <div className="flex items-center w-full gap-2 py-2 ">
          <ReportsIcon />
          <Links linkName="Reports" />
        </div>
        {/* ----- */}
        {/* ----- */}
        <div className="flex items-center w-full gap-2 py-2 ">
          <StockManagementIcon />
          <Links linkName="Stock Management" />
          <Tag tagName="Beta" />
        </div>
        {/* ----- */}
        {/* ----- */}
        <div className="flex items-center w-full gap-2 py-2 ">
          <MyAccountIcon />
          <Links linkName="My Account" />
        </div>
        {/* ----- */}
        {/* ----- */}
        <div className="flex items-center w-full gap-2 py-2 ">
          <SettingsIcon />
          <Links linkName="Settings" />
        </div>
        {/* ----- */}
        {/* ----- */}
        <div className="flex items-center w-full gap-2 py-2 ">
          <HelpIcon />
          <Links linkName="Help and Support" />
        </div>
        {/* ----- */}
        {/* ----- */}
        <div className="flex items-center w-full gap-2 py-2 ">
          <OffersManagementIcon />
          <Links linkName="Offer Management" />
          <Tag tagName="Coming soon" />
        </div>
        {/* ----- */}
        {/* ----- */}
        <div onClick={handleLogout} className="cursor-pointer flex items-center w-full gap-2 py-2 ">
          <LogoutIcon />
          <Links linkName="Logout" />
        </div>
        {/* ----- */}
      </div>
      {/* --Footer-- */}
      <Footer/>
    </div>
  );
}
