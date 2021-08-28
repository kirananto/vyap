import {Footer} from "../Components/Footer";
import * as React from "react";
import { ItemCard } from "./ItemCard";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="mobile-main">
      {/* <!-- * Header --> */}
      <header className="flex flex-col gap-2 p-4 bg-white shadow-md">
        <div className="flex w-full h-full ">
          <Link to="/profile" className="flex flex-col w-4/5">
            <h1 className="text-lg font-semibold text-gray-600 font-ProductSans">Welcome👋</h1>
            <h1 className="text-lg font-black text-transparent PRODUCT-SANS-BOLD bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-900 ">XYZ Supplier</h1>
          </Link>
          <div className="flex items-center justify-end w-1/5 ">
            <img
              className="h-12 rounded-full shadow-lg"
              src="../assets/icons/profile/profile-icon.svg"
              alt=""
            />
          </div>
        </div>

        {/* <!-- Search Customer Field --> */}

        <div className="relative flex w-full">
          <input
            type="text"
            id="input"
            className="w-full h-10 pl-4 pr-5 bg-gray-100 rounded outline-none "
            placeholder="Search"
          />
          {/* <img
            src="../assets/icons/search.svg"
            className="absolute h-4 top-3 left-3"
            id="input_img"
          /> */}
        </div>
      </header>
      {/* <!-- * Header End -->

      <!-- ! Nav-Menu Top --> */}
      {/* <div className="nav-top-main">
        <div className="flex items-center justify-center w-11/12 py-4 bg-white rounded shadow nav-top-container">
          <div className="nav-top-child-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xs font-semibold text-gray-500">
              Add Product
            </h3>
          </div>
          <div className="nav-top-child-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            <h3 className="text-xs font-semibold text-gray-500">All Orders</h3>
          </div>
          <div className="nav-top-child-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h3 className="text-xs font-semibold text-gray-500">Reports</h3>
          </div>
        </div>
      </div> */}

      {/* <!-- ! Nav-MenuTop End --> */}

      {/* <!-- Customer Field End -->

      <!-- Customer Cards --> */}
      <div className="relative divide-y card-main-container scrollDes divide-light-blue-400">
        {Array(10)
          .fill(20)
          .map((item, index) => (
            <ItemCard item={item} key={index} />
          ))}
      </div>
      {/* <!-- Customer Card End -->
      <!-- Add Customer Button --> */}
      <button className="text-white text-md add-cutomer-btn bg-gradient-to-br from-blue-500 to-indigo-700">
        Add Customer
      </button>
      <Footer />
    </div>
  );
};
