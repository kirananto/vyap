import React from "react";
import dairyMilkSvg from "../../assets/img/Dairymilk.jpeg"

export default function ProductCard({ item, onClicked, onMore } : { item: any, onClicked: any, onMore: any }) {
  const fontSize = {
    fontSize: "10px",
    top: "-8px",
    marginLeft: "1px",
  };
  return (
    <div className="flex items-center justify-between w-11/12 gap-4 py-4 mx-auto bg-white dark:bg-gray-900">
      {/*
      =============
      Col-1
      =============
      */}
      <div>
        <input
          type="checkbox"
          className="w-5 h-5 bg-red-200 active:bg-red-400"
          onChange={onClicked}
        />
      </div>
      {/* 
      ==========
      Col-2 
      ==========
      */}
      <div className="flex w-3/4">
        <div className="relative p-2 border-2 rounded-lg">
          {/* col-1 product */}
          <div
            style={fontSize}
            className="absolute flex items-center justify-center px-1 font-semibold text-red-400 bg-red-200 rounded"
          >
            Out of stock
          </div>
          <img src={dairyMilkSvg} className="w-14 " alt="" />
        </div>
        {/* col-2 product */}
        <div className="flex flex-col ml-2 ">
          <h1 className="font-semibold text-md dark:text-gray-200 ">{item?.centralCatalogue?.name} ({item?.aliasName})</h1>
          <p className="text-sm font-semibold text-gray-400 dark:text-gray-300 ">#{item.id?.split('-')[0]}</p>
          <div className="flex gap-2">
            <p className="text-sm font-semibold text-gray-500  dark:text-gray-400 ">MRP: ₹{item?.mrpPrice}</p>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Cost: ₹{item?.rate}</p>
          </div>
        </div>
      </div>
      {/*
      =============
      Col-3 
      =============
      */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor" 
          onClick={onMore}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </div>
    </div>
  );
}
