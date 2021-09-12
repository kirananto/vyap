import React from "react";
import FilterCategories from "./FilterCategories";

export function FilterPopup() {
  return (
    <div className="bg-white w-full custom-filter w-11/12 mx-auto ">
      <div className="flex items-center justify-between">
        {/* col-1 */}
        <div className="flex gap-2">
          {/* icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
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
      <FilterCategories />
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
