import React from "react";
import { Link } from "react-router-dom";
import Button from "./Style/Button";

function Footer() {
  return (
    <div className="fixed bottom-0 flex w-full overflow-x-auto bg-white border shadow-md">
      {/* Nav-Item-1 */}
      <Link
        to="/"
        className="flex items-center justify-center w-1/2 pt-3 pb-2 text-center cursor-pointer hover:bg-indigo-100"
      >
        <figure className="grid justify-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <figcaption className="text-sm font-semibold text-gray-500">
            Customers
          </figcaption>
        </figure>
      </Link>

      {/* Nav-Item-2 */}

      <Link
        to="/my-products"
        className="flex items-center justify-center w-1/2 pt-3 pb-2 text-center cursor-pointer hover:bg-indigo-100"
      >
        <figure className="grid justify-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <figcaption className="text-sm font-semibold text-gray-500">
            My Products
          </figcaption>
        </figure>
      </Link>

      {/* Nav-Item-3 */}

      <Link
        to="/more"
        className="flex items-center justify-center w-1/2 pt-3 pb-2 text-center cursor-pointer hover:bg-indigo-100"
      >
        <figure className="grid justify-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <figcaption className="text-sm font-semibold text-gray-500">
            More
          </figcaption>
        </figure>
      </Link>
    </div>
  );
}

// ! (SimpleFooter) Footer with only one button-->:

function SimpleFooter(props: { btnName: string, onClick?: any, isDisabled?: boolean }) {
  return (
    <div className="fixed bottom-0 flex items-center justify-center w-full h-20 bg-white shadow shadow-2xl">
      <Button onClick={props.onClick} className="w-8/12 h-12" isDisabled={props.isDisabled}>
        {props.btnName}
      </Button>
    </div>
  );
}

export { Footer, SimpleFooter };
