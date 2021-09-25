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
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCredentials, setCredentials } from "../Login/credentialsSlice";
import { useHistory } from "react-router-dom";
import profPic from "src/assets/icons/profile/profile-icon.svg"

export default function More() {
  const { user } = useSelector(selectCredentials)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    dispatch(setCredentials({ user: undefined, token: undefined }))
    history.push('/login')
  }

  return (
    <div className="bg-white">
      <SimpleHeader heading="More" />
    <div className="h-screen overflow-y-scroll pb-48">
      <div className="flex flex-col items-center justify-center gap-2 py-5">
        <img
          src={user?.profileImageUrl ?? profPic}
          className="mt-10 w-24 rounded-full"
          alt="profile-pic"
        />
        <h1 className="text-2xl mt-2 font-bold text-gray-500">{user?.organization?.name}</h1>
      </div>
      {/* Menu */}
      {/* ----- */}
      <div className="flex flex-col gap-2 pl-10 mt-2">
        <NavLink to="/all-payments" className="flex items-center w-full gap-2 py-2 ">
          <PaymentIcon />
          <Links linkName="All Payments" />
        </NavLink>
        {/* ----- */}
        {/* ----- */}
        <NavLink to="/orders" className="flex items-center w-full gap-2 py-2 ">
          <AllOrdersIcon />
          <Links linkName="All Orders" />
        </NavLink>
        {/* ----- */}
        {/* ----- */}
        <NavLink to="/reports" className="flex items-center w-full gap-2 py-2 ">
          <ReportsIcon />
          <Links linkName="Reports" />
        </NavLink>
        {/* ----- */}
        {/* ----- */}
        <NavLink to="/stock-management" className="flex items-center w-full gap-2 py-2 ">
          <StockManagementIcon />
          <Links linkName="Stock Management" />
          <Tag tagName="Beta" />
        </NavLink>
        {/* ----- */}
        {/* ----- */}
        <NavLink to="/my-account" className="flex items-center w-full gap-2 py-2 ">
          <MyAccountIcon />
          <Links linkName="My Account" />
        </NavLink>
        {/* ----- */}
        {/* ----- */}
        <NavLink to="/settings" className="flex items-center w-full gap-2 py-2 ">
          <SettingsIcon />
          <Links linkName="Settings" />
        </NavLink>
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
      </div>
      {/* --Footer-- */}
      <Footer/>
    </div>
  );
}
