import Footer from './Components/Footer';
import * as React from 'react';
import { signout } from './Firebase/UserProvider';

export const Profile = () => {
  return (
    <div className="mobile-main">
    {/* <!-- Profile Header --> */}
    <div className="flex flex-col items-center mb-12 mt-10">
      <img
        className="w-20 mb-4"
        src="./assets/icons/profile/profile-icon.svg"
        alt=""
      />
      <h2 className="font-bold text-xl">Jhon Doe</h2>
      <h5 className="leading-6 font-semibold text-sm text-gray-500">Shope Name</h5>
    </div>

    {/* <!-- cards Container--> */}
    <div className="flex justify-center items-center flex-col">
      {/* <!-- Card-1 --> */}
      <div className="flex w-8/12 rounded-xl shadow border border-gray-100 flex-col justify-center items-center">
        <div className="p-4 w-full text-center border-b-2 border-gray-100 cursor-pointer">
          <h4><a className="text-sm font-semibold text-gray-900" href="#">My Account</a></h4>
        </div>
        <div className="p-4 w-full text-center cursor-pointer">
          <h4><a className="text-sm font-semibold text-gray-900" href="#">Stock Adjust</a></h4>
        </div>
      </div>
      {/* <!-- card-2 --> */}
      <div className="flex w-8/12 rounded-xl shadow border border-gray-100 flex-col justify-center items-center mt-12">
        <div className="p-4 w-full text-center border-b-2 border-gray-100 cursor-pointer">
          <h4><a className="text-sm font-semibold text-gray-900" href="#">Settings</a></h4>
        </div>
        <div className="p-4 w-full text-center cursor-pointer">
          <h4><a className="text-sm font-semibold text-gray-900" onClick={signout}>Logout</a></h4>
        </div>
      </div>
    </div>
    {/* <!-- Cards Container End --> */}

      <button className="text-white p-4 w-8/12 m-auto mt-12 rounded-xl flex justify-center items-center gap-6 h-50 bg-green-500 transition-transform delay-250 hover:bg-green-600">
        <img
          className="w-5"
          src="./assets/icons/profile/whatsapp.svg"
          alt=""
        />Help
      </button>
    <Footer />
  </div>
  );
}
