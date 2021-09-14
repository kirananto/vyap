import React from "react";
import FilterCategories from "./FilterCategories";

interface SortingProps {
  sortingName: string;
}
const Sorting = (props: SortingProps) => {
  return (
    <div className="flex items-center gap-2 ml-4">
      <input type="radio" name="" id="" />
      <label htmlFor="" className="text-sm font-semibold text-gray-500">
        {props.sortingName}
      </label>
    </div>
  );
};

export function FilterPopup() {
  return (
    <div className="w-11/12 mx-auto bg-white shadow-2xl custom-filter">
      <div className="flex items-center justify-between mb-4">
        {/* col-1 */}
        <div className="flex gap-2">
          {/* icon */}
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h1 className="text-lg font-semibold text-gray-500">Filters</h1>
        </div>
        {/* col-2 */}
        <div>
          <p className="text-xs font-bold text-blue-500">Clear All</p>
        </div>
      </div>
      {/* --------- */}
      <div className="flex flex-col gap-4">
        <FilterCategories heading="Based On Category" />
        <FilterCategories heading="Based On Brands" />
      </div>
      {/* Sorting */}
      <div className="flex gap-2 mt-4">
        {/* col-1 for icon */}
        <div>
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
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
        </div>
        {/* col-2 for heading */}
        <div>
          <h1 className="text-lg font-semibold text-gray-500">Sorting</h1>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Sorting sortingName="Latest first" />
        <Sorting sortingName="Price-Low to High" />
        <Sorting sortingName="Price-High to Low" />
      </div>
    </div>
  );
}
// ! Single Product Handleler Popup

export function MorePopup() {
  return (
    <div className="flex flex-col w-11/12 gap-3 mx-auto bg-white shadow-2xl custom-filter">
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold text-gray-500 ">Options</h1>
        <p className="text-xs font-semibold text-gray-300">1 item selected</p>
      </div>
      {/* row-1 */}
      <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 custom-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span>Delete Products(s)</span>
      </button>
      {/* ---- */}
      <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 custom-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span>Mark out of stock</span>
      </button>
      {/* ---- */}
      <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 custom-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <span>Mark in stock</span>
      </button>
      {/* --------- */}
      <button className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 custom-btn ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <span>Edit product (Only for single) </span>
      </button>
    </div>
  );
}
// ! Filter bar  Popup
export function SearchMorePopup() {
  return (
    <div className="flex flex-col w-11/12 gap-3 mx-auto bg-white shadow-2xl custom-filter">
      {/* Heading */}
      <div className="flex flex-col justify-between mb-4">
        <h1 className="text-lg font-bold text-gray-500 ">Manoharam Pillai</h1>
        <p className="text-xs font-semibold text-gray-300">Order taker</p>
      </div>
      <button className="inline-flex items-center gap-4 text-sm font-semibold text-gray-500 custom-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span>Delete User</span>
      </button>
      <button className="inline-flex items-center gap-4 mb-10 text-sm font-semibold text-gray-500 custom-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        <span>Edit User </span>
      </button>
    </div>
  );
}

export function EmptyPopup() {
  return null;
}
