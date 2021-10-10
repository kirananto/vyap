import React from "react";

export default function FilterBar({
  onMoreClick
} : {
  onMoreClick: any
}) {
  return (
    <>
      <div className="flex mx-auto mt-1">
        <p className="text-xs font-semibold text-gray-400">10 items selected</p>
      </div>
      <div className="relative flex justify-between gap-2 mt-2 ">
        {/* ===Button-1=== */}
        <button className="inline-flex items-center justify-center w-1/4 px-3 py-1 font-bold text-red-400 bg-red-200 dark:bg-gray-800 rounded border dark:border-red-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span className="text-sm">Delete</span>
        </button>
        {/* ===Button-2=== */}
        <button className="inline-flex items-center justify-center w-2/4 px-3 py-1 font-bold text-gray-500 bg-gray-300 rounded dark:bg-gray-800 dark:text-gray-300 dark:border dark:border-gray-300 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <span className="text-sm">Mark out of stock</span>
        </button>
        {/* ===Button-3=== */}
        <button onClick={onMoreClick} className="inline-flex items-center justify-center w-1/4 px-3 py-1 font-bold text-gray-500 bg-gray-300 rounded dark:bg-gray-800 dark:text-gray-300 dark:border dark:border-gray-300 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
          <span className="text-sm">More</span>
        </button>
      </div>
    </>
  );
}
