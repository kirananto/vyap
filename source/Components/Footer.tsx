import React from 'react'
import { Link } from 'react-router-dom';
export default function Footer() {
 
  return (
    <div className="fixed bottom-0 w-full border bg-white flex overflow-x-auto shadow-md">
      <Link to="/" className="flex cursor-pointer justify-center pt-3 pb-2 hover:bg-indigo-100 items-center w-1/2 text-center">
        <figure className="grid justify-items-center">
          <img className="w-6" src="../assets/icons/home.svg" alt="" />
          <figcaption className="text-sm font-semibold text-gray-900">
            Home
          </figcaption>
        </figure>
      </Link>
      <Link to="/payment" className="flex cursor-pointer pt-3 pb-2 hover:bg-indigo-100 justify-center items-center w-1/2 text-center">
        <figure className="grid justify-items-center">
          <img className="w-6" src="../assets/icons/more.svg" alt="" />
          <figcaption className="text-sm font-semibold text-gray-900">
            More
          </figcaption>
        </figure>
      </Link>
    </div>
  );
}
