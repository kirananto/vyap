import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchProductById } from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { hapticFeedback } from 'src/utils/vibrate'

export default function ProductSuggestionCard({ 
    item, 
    handleAddItem, 
    handleRemoveItemItem,
    selectedItems,
    updateItem
} : { 
     item: any,
     handleAddItem: any, 
     handleRemoveItemItem: any,
     updateItem: any,
     selectedItems: any
     }) {

    return ( <div
        className="grid flex-none w-48 bg-white-200 dark:bg-gray-800 mt-2 px-4 border rounded dark:border-gray-600 py-4 overflow-hidden"
    >
        <div className="relative self-center -mt-4 -mx-4 w-auto h-24 rounded-tl-l grounded-tr-lg overflow-hidden bg-cover bg-center bg-gradient-to-br from-blue-100 to-indigo-100">
            {item?.thumbnailImage && (
                <img
                    src={getImageURL(
                        item?.thumbnailImage,
                        IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                    )}
                    alt="Avatar"
                    className="object-cover w-full h-full"
                />
            )}
        </div>

        <div className="flex flex-col ml-0 self-center">
            <div className="text-sm w-32 mt-1 font-bold text-gray-600 dark:text-gray-200 truncate">
                {item?.aliasName ?? ''}{item?.aliasName ? <i className="ml-1">({item?.centralCatalogue?.name})</i> : item?.centralCatalogue?.name } 
            </div>
            <div className="grid grid-cols-2 my-2 mb-3">
                <div className="text-xs font-semibold text-gray-500  dark:text-gray-400">
                    <p>MRP:</p>
                    <p>₹{item?.mrpPrice}</p>
                </div>
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <p>Cost:</p>
                    <p>{item?.rate}</p>
                </div>
            </div>
        </div>

        <div className="flex gap-3 justify-self-center">
            <div className="flex text-blue-600 dark:text-blue-400 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                        hapticFeedback()
                        handleRemoveItemItem(item, 1)
                    }}
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
            <div className="flex items-center dark:text-gray-200">
                <form autoComplete="off">
                    <input
                        className="w-16 border-dashed border px-1 border-indigo-300 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 rounded px-2 "
                        type="number"
                        name="qty"
                        id="qty"
                        onChange={(e) => {
                            updateItem(item, parseInt(e.target.value.toString()))
                        }}
                        value={
                            selectedItems?.find(
                                (findItem: any) => findItem?.id === item?.id
                            )?.quantity ?? 0
                        }
                    />
                </form>
            </div>

            <div className="flex text-blue-600 dark:text-blue-400 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                        hapticFeedback()
                        handleAddItem(item, 1)
                    }}
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
        </div>
    </div>)
}