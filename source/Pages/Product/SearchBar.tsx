import React from "react";

export default function SearchBar({onFilterClick}) {
  return (
    <div className="relative flex justify-center w-full gap-2 mt-2">
      <input
        type="text"
        id="input"
        className="w-10/12 h-10 pl-4 pr-5 bg-gray-100 rounded outline-none "
        placeholder="Search"
      />
      <img
        src="../assets/icons/filter.svg"
        className="w-6 text-gray-500 icon-custom"
        onClick={onFilterClick}
        alt=""
      />
    </div>
  );
}
