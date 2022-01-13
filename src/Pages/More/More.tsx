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
  SwitchIcon,
} from "./Icons/Payment";
import Links from "./Links";
import Tag from "./Tag";
import { Footer } from "../../Components/Footer";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCredentials, setCredentials } from "../Login/credentialsSlice";
import { useNavigate } from "react-router-dom";
import profPic from "src/assets/icons/profile/profile-icon.svg"
import { useIntl } from "react-intl";
import { logOutAPI } from "src/API/login.axios";
import { clearAll } from "../ChatView/chatListSlice";
import { hapticFeedback } from "src/utils/vibrate";

export default function More() {
  const { user, token } = useSelector(selectCredentials)
  const intl = useIntl()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    //TODO Add hooks to other data's that need's to be cleared too.
    logOutAPI(token!).then(result => {
      dispatch(setCredentials({ user: undefined, token: undefined }))
      navigate('/login')
    }).catch(error => {  
      dispatch(setCredentials({ user: undefined, token: undefined }))
      navigate('/login')
    }).finally(() => {
      dispatch(clearAll())
    })
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="h-screen overflow-y-auto pb-48">
        <div className="flex flex-col items-center justify-center gap-2 py-5">
          <img
            src={user?.profileImageUrl ?? profPic}
            className="mt-10 w-24 rounded-full"
            alt="profile-pic"
          />
          <h1 className="text-2xl mt-2 font-bold text-gray-500 dark:text-gray-200">{user?.organization?.name}</h1>
        </div>
        {/* Menu */}
        {/* ----- */}
        <div className="flex flex-col gap-2 pl-10 mt-2">
          <NavLink to="/all-payments" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500 ">
            <PaymentIcon />
            <Links linkName={intl.formatMessage({ id: 'global.allPayments'})} />
          </NavLink>
          {/* ----- */}
          {/* ----- */}
          <NavLink to="/orders" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500 ">
            <AllOrdersIcon />
            <Links linkName={intl.formatMessage({ id: 'global.allOrders'})} />
          </NavLink>
          {/* ----- */}
          {/* ----- */}
          <NavLink to="/reports" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
            <ReportsIcon />
            <Links linkName={intl.formatMessage({ id: 'global.reports'})} />
            <Tag tagName={intl.formatMessage({ id: 'global.comingSoon'})} />
          </NavLink>
          {/* ----- */}
          {/* ----- */}
          {user?.organization?.isSupplier && <NavLink to="#" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
            <StockManagementIcon />
            <Links linkName={intl.formatMessage({ id: 'global.stockManagement'})} />
            <Tag tagName={intl.formatMessage({ id: 'global.comingSoon' }) } />
          </NavLink>}
          {/* ----- */}
          {/* ----- */}
          <NavLink to="/my-account" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
            <MyAccountIcon />
            <Links linkName={intl.formatMessage({ id: 'global.myAccount'})} />
          </NavLink>
          {/* ----- */}
          {/* ----- */}
          <NavLink to="/settings" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
            <SettingsIcon />
            <Links linkName={intl.formatMessage({ id: 'global.settings'})} />
          </NavLink>
          {/* ----- */}
          {/* ----- */}
          <a href="mailto:mail@vyap.app" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
            <HelpIcon />
            <Links linkName={intl.formatMessage({ id: 'global.help'})} />
          </a>
          
          {user?.organization?.isSupplier === false && <a href="mailto:mail@vyap.app" onClick={hapticFeedback} className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
            <SwitchIcon />
            <Links linkName={intl.formatMessage({ id: 'global.switch'})} />
          </a>}
          {/* ----- */}
          {/* ----- */}
          {user?.organization?.isSupplier && <div className="flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
            <OffersManagementIcon />
            <Links linkName={intl.formatMessage({ id: 'global.offer'})} />
            <Tag tagName={intl.formatMessage({ id: 'global.comingSoon'})} />
          </div>}
          {/* ----- */}
          {/* ----- */}
          <div onClick={handleLogout} className="cursor-pointer flex items-center w-full gap-2 py-2 dark:text-gray-300 text-gray-500">
            <LogoutIcon />
            <Links linkName={intl.formatMessage({ id: 'global.logout'})} />
          </div>
          {/* ----- */}
        </div>
      </div>
      {/* --Footer-- */}
      <Footer />
    </div>
  );
}
