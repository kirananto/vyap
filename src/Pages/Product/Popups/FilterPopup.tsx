import React from 'react'
import FilterCategory from '../FilterCategory'
import FilterBrands from '../FilterBrands'
import { useDispatch, useSelector } from 'react-redux'
import {
    clearAll,
    selectProductFilters,
    setSorting,
} from '../productFiltersSlice'
import { FormattedMessage } from 'react-intl'

interface SortingProps {
  sortingName: string;
  value: 'latest' | 'price-high-low' | 'price-low-high' | undefined;
}

const Sorting = (props: SortingProps) => {
    const dispatch = useDispatch()
    const filters = useSelector(selectProductFilters)

    const isChecked = filters?.sorting === props.value

    function onChangeSorting() {
        dispatch(setSorting(props.value))
    }

    return (
        <div className="ml-4 flex items-center gap-2 pb-1">
            <input type="radio" id={`radioBox${props.sortingName}`} checked={isChecked} onChange={onChangeSorting} />
            <label
                htmlFor={`radioBox${props.sortingName}`}
                className="text-sm font-semibold text-gray-500 dark:text-gray-400"
            >
                {props.sortingName}
            </label>
        </div>
    )
}

export function FilterPopup() {
    const dispatch = useDispatch()

    return (
        <div style={{}} className="max-h-[80vh] overflow-y-scroll px-4 pt-2 pb-10">
            <div className="mb-4 flex items-center justify-between ">
                {/* col-1 */}
                <div className="flex gap-2 text-gray-500 dark:text-gray-200">
                    {/* icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                    <h1 className="text-lg font-semibold ">Filters</h1>
                </div>
                {/* col-2 */}
                <div>
                    <p
                        className="cursor-pointer text-xs font-bold text-blue-500"
                        onClick={() => dispatch(clearAll())}
                    >
                        <FormattedMessage id="global.clearAll" defaultMessage="Clear All" />
                    </p>
                </div>
            </div>
            {/* --------- */}
            <div className="flex flex-col gap-4">
                <FilterCategory heading="Based On Tags" type="category" />
                <FilterBrands heading="Based On Brands" type="brand" />
            </div>
            {/* Sorting */}
            <div className="mt-4 flex gap-2 text-gray-500 dark:text-gray-300">
                {/* col-1 for icon */}
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                        />
                    </svg>
                </div>
                {/* col-2 for heading */}
                <div>
                    <h1 className="text-lg font-semibold ">Sorting</h1>
                </div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
                <Sorting sortingName="Latest first" value="latest" />
                <Sorting sortingName="Price-Low to High" value="price-high-low" />
                <Sorting sortingName="Price-High to Low" value="price-low-high" />
            </div>
        </div>
    )
}