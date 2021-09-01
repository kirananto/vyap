import { Footer } from "../../Components/Footer";
import * as React from "react";
import { ItemCard } from "./ItemCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCredentials } from "../../Pages/Login/credentialsSlice";

export const Home = () => {
  const { user } = useSelector(selectCredentials)
  return (
    <div className="mobile-main">
      {/* <!-- * Header --> */}
      <header className="flex flex-col gap-2 p-4 bg-white shadow-md">
        <div className="flex w-full h-full ">
          <Link to="/more" className="flex flex-col w-4/5">
            <h1 className="text-lg font-semibold text-gray-600 font-ProductSans">
              Welcome👋
            </h1>
            <h1 className="text-lg font-black text-transparent PRODUCT-SANS-BOLD bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-900 ">
              {user?.name}
            </h1>
          </Link>
          <div className="flex items-center justify-end w-1/5 ">
            <img
              className="h-12 rounded-full shadow-lg"
              src={user?.profileImageUrl ?? "../assets/icons/profile/profile-icon.svg"}
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
        </div>
      </header>

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
