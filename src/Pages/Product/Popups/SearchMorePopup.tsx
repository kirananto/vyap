import React from 'react'


export function SearchMorePopup({ isVisible, toggleVisibility }: { isVisible: boolean, toggleVisibility: any }) {
    return (<>
      <div onClick={toggleVisibility} className={`fixed pin top-0 z-10 ${isVisible ? 'show' : 'hidden'} overflow-auto bg-gray-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`} />
      <div className="flex flex-col w-full gap-3 bg-white popup text-left animate__animated animate__fadeInUpBig animate__faster">
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
    </>
    );
  }