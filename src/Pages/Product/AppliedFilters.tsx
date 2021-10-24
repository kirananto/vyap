import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCheckedOptions from './ProductCheckedOptions'
import { clearAll, selectProductFilters } from './productFiltersSlice'

export default function AppliedFilters({
    selectedProduct,
    onMoreClick,
    onFilterClick
}: {
    selectedProduct: any[],
    onMoreClick: any,
    onFilterClick: any
}) {

    const filters = useSelector(selectProductFilters)

    const dispatch = useDispatch()

    const filterText = (value: string) => {
        switch(value) {
            case 'latest': return `Sort by latest`
            case 'price-high-low': return `Price-High to Low`
            case 'price-low-high': return `Price-Low to High`
        }
    }

    function hasFilters () {
        return filters?.categories?.length > 0 || filters?.brands?.length > 0 || filters?.sorting !== undefined
    }
    return (
        <div className="px-4">
            {selectedProduct?.length === 0 ? (<div className={'flex my-2 gap-4'}>
                <div className="w-10/12">
                    <input placeholder={'Search'} className="p-2 pl-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 dark:placeholder-gray-50 " />
                </div>
                <div onClick={onFilterClick} className={'flex border border-gray-200 rounded place-items-center px-4 py-1 text-gray-400 cursor-pointer text-base font-semibold'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                </div>
            </div>) : (
                <div className={'my-2'}>
                    <ProductCheckedOptions onMoreClick={onMoreClick} />
                </div>
            )}
            <div className="flex justify-between py-2">
                <div className="flex flex-col">
                    <div className="flex gap-2 items-end">
                        <div className={'text-base font-bold text-gray-500 dark:text-gray-300'}>Applied Filters</div>
                        {hasFilters() && <div className={'text-sm font-semibold text-blue-500  dark:text-blue-300 cursor-pointer'} onClick={() => dispatch(clearAll())}>Clear all</div>}
                    </div>
                    {hasFilters() ? <div className="flex gap-2 mt-2">
                        {filters?.categories?.map(mapItem => <div key={mapItem.id} className="flex bg-blue-200 font-bold text-sm text-blue-800 px-2 rounded items-center">{mapItem.name}</div>)}
                        {filters?.brands?.map(mapItem => <div key={mapItem.id} className="flex bg-green-200 font-bold text-sm text-blue-800 px-2 rounded items-center">{mapItem.name}</div>)}
                        {filters?.sorting && (
                            <div className="flex bg-purple-200 font-bold text-sm text-blue-800 px-2 rounded items-center">
                                {filterText(filters?.sorting)}
                            </div>)}
                    </div> : <div className="flex gap-2 mt-2 text-sm text-gray-400 dark:text-gray-300"> No filters applied</div>}
                </div>
            </div>
        </div>
    )
}