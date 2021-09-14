import React from 'react'

export default function AppliedFilters() {
    return (
        <div className="flex w-11/12 m-auto justify-between py-4">
            <div className="flex flex-col ml-4">
                <div className="flex gap-2 items-end">
                    <div className={'text-sm text-gray-600'}>Applied Filters & Sorting</div>
                    <div className={'text-xs text-blue-800 cursor-pointer'}>Clear all</div>
                </div>
                <div className="flex gap-2 mt-2">
                    <div className="flex bg-blue-200 font-bold text-sm text-blue-800 px-2 rounded items-center">K & K Auto mobiles</div>
                    <div className="flex bg-green-200 font-bold text-sm text-green-800 px-2 rounded items-center">Order completed</div>
                </div>
            </div>
            <div className="flex">
                <div className={'flex border border-gray-200 rounded place-items-center px-2 py-1 text-gray-600 cursor-pointer text-base font-semibold'}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <div>Filters</div>
                </div>
            </div>
        </div>
    )
}