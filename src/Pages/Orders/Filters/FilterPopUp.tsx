import React from 'react'
import FilterAccounts from './FilterAccounts'
import { useDispatch, useSelector } from 'react-redux'
import { clearAll, selectOrderFilters, setSorting } from './orderFiltersSlice'
import { FormattedMessage } from 'react-intl'

interface SortingProps {
  sortingName: string;
  value: 'latest' | 'price-high-low' | 'price-low-high' | undefined;
}

const Sorting = (props: SortingProps) => {

    const dispatch = useDispatch()
    const filters = useSelector(selectOrderFilters)

    const isChecked = filters?.sorting === props.value

    function onChangeSorting() {
        dispatch(setSorting(props.value))
    }

    return (
        <div className="flex items-center gap-2 ml-4">
            <input type="radio" checked={isChecked} onChange={onChangeSorting} />
            <label htmlFor="" className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {props.sortingName}
            </label>
        </div>
    )
}

export function FilterPopup() {

    const dispatch = useDispatch()


    return (
        <div className="pt-2 px-4 pb-10">
            <div className="flex items-center justify-between mb-4">
                {/* col-1 */}
                <div className="flex gap-2 text-gray-500 dark:text-gray-200">
                    {/* icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
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
                    <p className="text-xs font-bold text-blue-500 cursor-pointer" onClick={() => dispatch(clearAll())}>
                        <FormattedMessage
                            id="global.clearAll"
                            defaultMessage="Clear All"
                        />
                    </p>
                </div>
            </div>
            {/* --------- */}
            <div className="flex flex-col gap-4">
                <FilterAccounts heading="Based On Accounts" type="account" />
                <FilterAccounts heading="Based On Order status" type="orderStatus" />
            </div>
            {/* Sorting */}
            <div className="flex gap-2 mt-4 text-gray-500 dark:text-gray-300">
                {/* col-1 for icon */}
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
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
            <div className="flex flex-col gap-1 mt-2">
                <Sorting sortingName="Latest first" value="latest" />
                <Sorting sortingName="Price-Low to High" value="price-low-high" />
                <Sorting sortingName="Price-High to Low" value="price-high-low" />
            </div>
        </div>
    )
}