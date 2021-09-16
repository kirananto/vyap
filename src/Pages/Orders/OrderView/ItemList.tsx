import React, { useState } from "react";
import DairySmall from "../../../assets/img/DairySmall.jpeg"

function Items() {
    const items = [1, 1, 1, 1, 1]
    return (
        <div>
            {items.map((item, index) => (<div className="flex justify-between" key={`${index}`}>
                <div className="flex pt-4 gap-4">
                    <div className="h-14 w-14 rounded border border-gray-300 bg-white">
                        <img className="h-full w-full" src={DairySmall} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-sm font-bold text-gray-800">Dairy Milk Silk</div>
                        <div className="flex font-bold text-xs text-gray-400">15 Gms</div>
                        <div className="flex font-bold text-xs text-gray-600">MRP: 50</div>
                    </div>
                    <div className="flex h-5 w-10 rounded text-xs bg-gray-200 self-center items-center justify-center">
                        X 5
                    </div>
                </div>
                <div className="flex text-lg font-bold text-gray-600 items-center">
                    ₹500
                </div>
            </div>))}
        </div>
    )
}

export default function ItemList() {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className="w-11/12 p-4 bg-white rounded-md shadow">
            <div className="flex mb-4 items-center justify-between">
                <div className="flex flex-col text-2xl font-semibold text-gray-800">
                    Items
            </div>
                <div>
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
            {isExpanded && <Items />}
        </div>
    )
}
