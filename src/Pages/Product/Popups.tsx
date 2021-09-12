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
    <div className="w-11/12 mx-auto bg-white shadow-lg custom-filter">
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
export function MorePopup() {
  return (
    <div className="custom-filter">
      <h1>More Popup</h1>
    </div>
  );
}
export function SearchMorePopup() {
  return (
    <div className="custom-filter">
      <h1>Search More Popup</h1>
    </div>
  );
}

export function EmptyPopup() {
  return null;
}
