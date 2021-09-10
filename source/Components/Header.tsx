import React from "react";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <div className="flex w-11/12 pt-2 pb-2 m-auto bg-white ">
      {/* back icon  */}
      <NavLink to="/" className="flex items-center justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </NavLink>

      {/* Heading container */}
      <div className="flex flex-col w-4/5 pl-4 ">
        <h1 className="text-lg font-semibold text-gray-600 font-ProductSans">
          {props.heading}
        </h1>
        <h1 className="text-lg font-black text-transparent PRODUCT-SANS-BOLD bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-900">
          {props.subHeading}
        </h1>
      </div>
      {/* Right Icon container*/}
      <div className="flex items-center justify-center rounded-full ali w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-900">
        <img src={props.icon} alt="icon" />
      </div>
    </div>
  );
}

function PaymentBottomHeader() {
  const fontSize = {
    fontSize: "11.5px",
  };
  return (
    <div className="flex items-center justify-center w-full mt-1">
      {/* card container */}
      <div className="relative flex w-11/12 h-auto bg-gray-100 border border-gray-300 rounded-md">
        <div className="flex flex-col w-4/5 p-2 pl-3">
          <h6 style={fontSize} className="font-bold">
            Outstanding amount
          </h6>
          <h1 className="text-4xl font-semibold">₹ 32,000</h1>
        </div>
        <div className="flex justify-end w-full pr-4 ">
          <img
            className="self-end w-20 "
            src="../assets/illustrations/wallet.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

// ! Simple Header with only one heading and back button -->
function SimpleHeader(props) {
  return (
    <div className="flex items-center w-full h-16 pt-2 pb-2 m-auto shadow">
      {/* back icon  */}
      <NavLink to="/" className="flex items-center justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </NavLink>

      {/* Heading container */}
      <div className="flex flex-col w-4/5 pl-4 ">
        <h1 className="text-xl font-bold text-gray-600 font-ProductSans">
          {props.heading}
        </h1>
      </div>
    </div>
  );
}

export { Header, PaymentBottomHeader, SimpleHeader };
