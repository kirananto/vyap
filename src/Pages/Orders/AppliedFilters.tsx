import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { OrderStatusEnum } from './enum'
import { clearAll, selectOrderFilters } from './Filters/orderFiltersSlice'
import ReturnStatusTile from './OrderStatusTag'

export default function AppliedFilters({ openFilters }: { openFilters: () => void }) {

    const filters = useSelector(selectOrderFilters)
    const dispatch = useDispatch()

    const filterText = (value: string) => {
        switch (value) {
            case 'latest': return `Sort by latest`
            case 'price-high-low': return `Price-High to Low`
            case 'price-low-high': return `Price-Low to High`
        }
    }
    function hasFilters() {
        return filters?.account || (filters?.orderStatus?.length ?? -1) > 0 || filters?.sorting !== undefined
    }
    return (
        <div className="flex w-11/12 m-auto justify-between py-4">
            <div className="flex flex-col ml-4">
                <div className="flex gap-2 items-end">
                    <div className={'text-sm text-slate-600 dark:text-slate-300'}>
                        <FormattedMessage
                            id="global.appliedFilters"
                            defaultMessage="Applied Filters"
                        />
                    </div>
                    {hasFilters() && <div className={'text-sm font-semibold text-blue-500  dark:text-blue-300 cursor-pointer'} onClick={() => dispatch(clearAll())}>
                        <FormattedMessage
                            id="global.clearAll"
                            defaultMessage="Clear All"
                        />
                    </div>}
                </div>
                {hasFilters() ? <div className="flex flex-wrap gap-2 mt-2">
                    {filters?.account && <div className="flex bg-blue-200 font-bold text-sm text-blue-800 px-2 rounded items-center dark:bg-blue-900 dark:text-blue-100 dark:bg-opacity-80">{filters?.account?.name}</div>}
                    {filters?.orderStatus && <ReturnStatusTile status={OrderStatusEnum[filters?.orderStatus]} />}
                    {filters?.sorting && (
                        <div className="flex bg-purple-200 font-bold text-sm text-purple-800 px-2 rounded items-center dark:bg-purple-900 dark:text-purple-100 dark:bg-opacity-80">
                            {filterText(filters?.sorting)}
                        </div>)}
                </div> : <div className="flex gap-2 mt-2 text-sm text-slate-400 dark:text-slate-300"> No filters applied</div>}
            </div>
            <div className="flex " onClick={openFilters}>
                <div className={'flex border border-gray-200 rounded place-items-center px-2 py-1 text-slate-600 cursor-pointer text-base font-semibold dark:border-gray-300 dark:text-slate-300'}>
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