import React from "react";
import ToggleButton from "../Components/ToggleButton";
import { SimpleFooter } from "../Components/Footer";
import vyapLogo from '../../assets/new_logo.svg'


export default function SignupStepThree() {
  const logoStyle = { marginLeft: "-20px" };
  return (
    <div className="flex flex-col items-start w-full h-screen ">
      <div className="flex items-center justify-start px-8 mt-24 mb-5">
        <img
          style={logoStyle}
          className="w-24"
          src={vyapLogo}
          alt=""
        />
        <h1 className="text-4xl font-bold text-gray-600 ">VYAP</h1>
      </div>
      {/* Form */}
      <h1 className="px-8 mb-5 text-xl font-bold text-gray-500">
        Little bit more information to <br /> get started
      </h1>

      <form className="w-full ">
        <div className="flex flex-col gap-4 px-8">
          {/* ---===NAME===--- */}
          <div>
            <label className="block text-sm font-semibold text-gray-500">
              Your Name
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              type="text"
              placeholder="Enter your name"
            />
          </div>
          {/* ---===Shop Name===--- */}
          <div>
            <label className="block text-sm font-semibold text-gray-500">
              Business or shope name
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              type="text"
              placeholder="Name of the shope or business"
            />
          </div>

          {/* ---===Email===--- */}
          <div>
            <label className="block text-sm font-semibold text-gray-500">
              Email
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              type="text"
              placeholder="Your email"
            />
          </div>

          {/* ---===Pin Code===--- */}
          <div>
            <label className="block text-sm font-semibold text-gray-500">
              Pin Code
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              type="text"
              placeholder="Enter the pincode of your location"
            />
          </div>
          {/* ---===Location===--- */}
          <div>
            <p className="block text-sm font-semibold text-gray-500">
              Location
            </p>
            <div className="flex items-center gap-2">
              <p className="block text-sm font-semibold text-gray-400">
                Ihsudbfuig North P.O
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
          </div>

          {/* ---===Location===--- */}
          <div>
            <p className="block mb-2 text-sm font-semibold text-gray-500">
              List Items Privately
            </p>
            <ToggleButton />
          </div>
        </div>
        <SimpleFooter btnName="Proceed" />
      </form>
    </div>
  );
}
