import React, { useState } from 'react'
import DairySmall from '../../../../assets/img/DairySmall.jpeg'
export default function AddRemoveItems() {

    const [isExpanded, setIsExpanded] = useState(false)

    const items = [1, 1, 1, 1, 1]

    return (
        <div className="bg-white rounded p-4 mt-4 w-full dark:bg-slate-700">
            <div className="flex w-full items-center justify-between">
                <div className="flex text-xl dark:text-slate-300">
                    Items
                </div>
                <div className="flex">
                    {isExpanded ? (<div className="flex text-slate-600 dark:text-slate-300" onClick={() => setIsExpanded(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </div>

                    ) : (<div className="flex text-slate-600 dark:text-slate-300" onClick={() => setIsExpanded(true)}>
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
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                />
                {items.map((item, index) => (<div className="flex justify-between" key={`${index}`}>
                    {/* TODO: Remove this console.log */}
                    {console.log(item)}
                    <div className="flex pt-4 gap-2">
                        <div className="relative w-20 h-auto mt-1 rounded overflow-hidden bg-cover bg-center empty_image_background">
                            {DairySmall && <img src={DairySmall} alt="Avatar" className="object-cover w-full h-full" />}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-base font-bold text-slate-600 dark:text-slate-200">Dairy Milk Silk</div>
                            <div className="flex font-bold text-xs text-slate-400">Purchase cost: 50</div>
                        </div>
                        <div className="flex text-blue-600 dark:text-blue-400 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex items-center dark:text-slate-200">10</div>
                        <div className="flex text-blue-600 dark:text-blue-400 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex text-lg font-bold text-slate-600 dark:text-slate-200 items-center">
                        ₹500
                    </div>
                </div>))}
                <div className="flex w-full border border-dashed dark:border-slate-500 py-2 mt-4 cursor-pointer justify-center">
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 dark:text-slate-300 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <div className="flex font-bold text-slate-600  dark:text-slate-300 text-lg">
                        Add more items
                    </div>
                </div>
            </div>}
        </div>
    )
}