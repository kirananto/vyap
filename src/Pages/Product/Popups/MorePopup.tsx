import React from 'react'
export function MorePopup({ isVisible, toggleVisibility }: { isVisible: boolean, toggleVisibility: any }) {
    return (
      <>
        <div onClick={toggleVisibility} className={`fixed pin top-0 z-10 ${isVisible ? 'show' : 'hidden'} overflow-auto bg-gray-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`} />
        <div className="flex flex-col w-full gap-3 mx-auto bg-white popup text-left animate__animated animate__fadeInUpBig animate__faster">
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
      </>
    );
  }