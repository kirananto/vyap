import React from "react";

export default function SearchBar({ onFilterClick }: { onFilterClick: any }) {
  return (
    <div className="relative flex justify-center w-full gap-2 mt-2">
      <input
        type="text"
        id="input"
        className="w-10/12 h-10 pl-4 pr-5 bg-gray-100 rounded outline-none "
        placeholder="Search"
      />
      <div onClick={onFilterClick} className={'flex border border-gray-200 bg-gray-100 rounded place-items-center px-2 py-1 text-gray-600 cursor-pointer text-base font-semibold'}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
      </div>
    </div>
  );
}
