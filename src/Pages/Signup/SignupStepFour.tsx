import React from "react";
import vyapLogo from "../../assets/new_logo.svg";
import "./Signup.css";
import { SimpleFooter } from "../../Components/Footer";


const Card = () => {
  return (
    <div className="flex items-center gap-3 bg-white custom">
      {/* ===tick-div=== */}
      <div className="inline-flex items-center justify-center w-10 h-10 p-1 bg-green-200 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-green-800"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      {/* === */}
      <div className="flex flex-col custom-width-para-text">
        <h1 className="text-lg font-bold text-gray-600">Agriculture</h1>
        <p className="text-xs text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <img src="../../assets/illustrations/Shop.svg" alt="" />
      </div>
      <div className="background-graphics"></div>
    </div>
  );
};

export default function SignupStepTwo() {
  const logoStyle = { marginLeft: "-20px" };
  return (
    <div className="flex flex-col items-start w-full h-screen bg-gray-100">
      <div className="w-11/12 mx-auto ">
        <div className="flex items-center justify-start mt-32 mb-5">
          <img style={logoStyle} className="w-24 m--5" src={vyapLogo} alt="" />
          <h1 className="text-4xl font-bold text-gray-600 ">VYAP</h1>
        </div>

        <h1 className="text-lg font-bold text-gray-600">
          Please specify the <br /> category of business
        </h1>

        <div className="flex flex-col gap-4 mt-6">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <SimpleFooter btnName="Proceed"/>
    </div>
  );
}
