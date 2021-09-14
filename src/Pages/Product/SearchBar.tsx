import React from "react";
import filterSvg from '../../assets/icons/filter.svg'

export default function SearchBar({onFilterClick} : {onFilterClick : any} ) {
  return (
    <div className="relative flex justify-center w-full gap-2 mt-2">
      <input
        type="text"
        id="input"
        className="w-10/12 h-10 pl-4 pr-5 bg-gray-100 rounded outline-none "
        placeholder="Search"
      />
      <img
        src={filterSvg}
        className="w-6 text-gray-500 icon-custom"
        onClick={onFilterClick}
        alt=""
      />
    </div>
  );
}
