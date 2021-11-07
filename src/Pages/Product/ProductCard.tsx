import React from "react";
import { getImageURL, IMAGEKIT_FOLDERS } from "src/utils/imageKit";

export default function ProductCard({ item, onClicked, onMore, isChecked }: { item: any, onClicked: any, onMore: any, isChecked: boolean }) {

  return (
    <div className="flex items-center justify-between w-11/12 gap-4 py-2 mx-auto bg-gray-100 dark:bg-gray-900 mt-2">
      {/*
      =============
      Col-1
      =============
      */}
      <div>
        <input
          type="checkbox"
          className="w-5 h-5 bg-red-200 active:bg-red-400"
          onChange={() => onClicked(item)}
          checked={isChecked}
        />
      </div>
      {/* 
      ==========
      Col-2 
      ==========
      */}
      <div className="flex w-3/4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-cover bg-center bg-gradient-to-br from-blue-100 to-indigo-100">
          {item?.thumbnailImage && <img src={getImageURL(item?.thumbnailImage, IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE)} alt="Avatar" className="object-cover w-full h-full" />}
          {item.outOfStock && <div className="absolute w-full py-1 bottom-0 inset-x-0 bg-red-200 text-red-500 font-bold text-xs text-center leading-4">Out of stock</div>}
        </div>
        <div className="flex flex-col ml-4 mt-2">
          <h1 className="font-semibold text-md dark:text-gray-200 ">{item?.centralCatalogue?.name} {item?.aliasName ? `(${item?.aliasName})` : ''}</h1>
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
          className="w-6 h-6 text-gray-500 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => onMore(item)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </div>
    </div >
  );
}
