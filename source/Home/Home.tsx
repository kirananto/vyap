import Footer from "../Components/Footer";
import * as React from "react";
import { ItemCard } from "./ItemCard";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="mobile-main">
      {/* <!-- * Header --> */}
      <header className="head-container bg-gradient-to-br from-blue-500 to-indigo-700">
        <Link to="/profile" className="flex w-4/5 gap-4 items-center">
          <img className="w-6" src="../assets/icons/user.png" alt="" />
          <h1 className="text-white font-bold text-lg">XYZ's Super market</h1>
        </Link>
        <div className="head-left mt-2">
          <img className="w-5" src="../assets/icons/notification.svg" alt="" />
        </div>
      </header>
      {/* <!-- * Header End -->

      <!-- ! Nav-Menu Top --> */}
      <div className="nav-top-main">
        <div className="nav-top-container shadow w-11/12 rounded py-4 flex justify-center items-center bg-white">
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
            <h3 className="text-xs text-gray-500  font-semibold">
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

            <h3 className="text-xs text-gray-500 font-semibold">All Orders</h3>
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
            <h3 className="text-xs text-gray-500  font-semibold">Reports</h3>
          </div>
        </div>
      </div>

      {/* <!-- ! Nav-MenuTop End --> */}

      {/* <!-- Search Customer Field --> */}

      <div className="flex w-11/12 relative m-auto my-4	">
        <input type="text" id="input" className="shadow rounded border h-10 pl-10 pr-5 w-full border-gray-100" placeholder="Search Customer" />
        <img src="../assets/icons/search.svg" className="absolute h-4 top-3 left-3" id="input_img" />
      </div>
      {/* <!-- Customer Field End -->

      <!-- Customer Cards --> */}
      <div className="card-main-container scrollDes divide-y divide-light-blue-400">
        {Array(10)
          .fill(20)
          .map((item, index) => (
            <ItemCard item={item} key={index} />
          ))}
      </div>
      {/* <!-- Customer Card End -->
      <!-- Add Customer Button --> */}
      <button className="add-cutomer-btn text-sm rounded text-white bg-gradient-to-br from-blue-500 to-indigo-700">
        Add Customer
      </button>
      <Footer />
    </div>
  );
};
