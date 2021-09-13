import React, { useState } from 'react'
import DairySmall from "../../../../assets/img/DairySmall.jpeg"
export default function AddRemoveItems() {

    const [isExpanded, setIsExpanded] = useState(false)

    const items = [1,1,1,1,1]

    return (
        <div className="bg-white rounded p-4 w-full">
            <div className="flex w-full items-center justify-between">
                <div className="flex text-xl">
                    Items
                </div>
                <div className="flex">
                    {isExpanded ? (<div className="flex text-gray-600" onClick={() => setIsExpanded(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </div>

                    ) : (<div className="flex text-gray-600" onClick={() => setIsExpanded(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>)}
                </div>
            </div>
            {isExpanded && <div>
                <input
                    name="tel"
                    onChange={(event) => console.log(event?.target.value)}
                    id="tel"
                    placeholder="Search"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                />
                {items.map((item, index) => (<div className="flex justify-between" key={`${index}`}>
                    {/* TODO: Remove this console.log */}
                    {console.log(item)}
                    <div className="flex pt-4 gap-2">
                        <div className="h-10 w-10 rounded border border-gray-300 bg-white">
                            <img className="h-full w-full" src={DairySmall} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-base font-bold text-gray-600">Dairy Milk Silk</div>
                            <div className="flex font-bold text-xs text-gray-400">Purchase cost: 50</div>
                        </div>
                        <div className="flex text-blue-600 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex items-center">10</div>
                        <div className="flex text-blue-600 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex text-lg font-bold text-gray-600 items-center">
                        ₹500
                    </div>
                </div>))}
                <div className="flex w-full border border-dashed py-2 mt-4 cursor-pointer justify-center">
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <div className="flex font-bold text-gray-600 text-lg">
                        Add more items
                    </div>
                </div>
            </div>}
        </div>
    )
}