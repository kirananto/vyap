import {Footer} from './Components/Footer';
import * as React from 'react';

export const Profile = () => {
  return (
    <div className="mobile-main">
    {/* <!-- Profile Header --> */}
    <div className="flex flex-col items-center mt-10 mb-12">
      <img
        className="w-20 mb-4"
        src="./assets/icons/profile/profile-icon.svg"
        alt=""
      />
      <h2 className="text-xl font-bold">Jhon Doe</h2>
      <h5 className="text-sm font-semibold leading-6 text-gray-500">Shope Name</h5>
    </div>

    {/* <!-- cards Container--> */}
    <div className="flex flex-col items-center justify-center">
      {/* <!-- Card-1 --> */}
      <div className="flex flex-col items-center justify-center w-8/12 border border-gray-100 shadow rounded-xl">
        <div className="w-full p-4 text-center border-b-2 border-gray-100 cursor-pointer">
          <h4><a className="text-sm font-semibold text-gray-900" href="#">My Account</a></h4>
        </div>
        <div className="w-full p-4 text-center cursor-pointer">
          <h4><a className="text-sm font-semibold text-gray-900" href="#">Stock Adjust</a></h4>
        </div>
      </div>
      {/* <!-- card-2 --> */}
      <div className="flex flex-col items-center justify-center w-8/12 mt-12 border border-gray-100 shadow rounded-xl">
        <div className="w-full p-4 text-center border-b-2 border-gray-100 cursor-pointer">
          <h4><a className="text-sm font-semibold text-gray-900" href="#">Settings</a></h4>
        </div>
        <div className="w-full p-4 text-center cursor-pointer">
          <h4><a className="text-sm font-semibold text-gray-900" onClick={() => console.log('logout')}>Logout</a></h4>
        </div>
      </div>
    </div>
    {/* <!-- Cards Container End --> */}

      <button className="flex items-center justify-center w-8/12 gap-6 p-4 m-auto mt-12 text-white transition-transform bg-green-500 rounded-xl h-50 delay-250 hover:bg-green-600">
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
