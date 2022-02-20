import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import type { IProduct } from 'src/types/product'
import { hapticFeedback } from 'src/utils/vibrate'
import ProductCheckedOptions from './ProductCheckedOptions'
import { clearAll, selectProductFilters } from './productFiltersSlice'

export default function AppliedFilters({
    selectedProduct,
    onMoreClick,
    onFilterClick,
    setSearchValue,
    searchValue,
    setCounter,
    setselectedProduct
}: {
    selectedProduct: IProduct[],
    onMoreClick: () => void,
    onFilterClick: () => void,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
    searchValue: string,
    setCounter: React.Dispatch<React.SetStateAction<number>>,
    setselectedProduct: (value: IProduct[]) => void
}) {

    const filters = useSelector(selectProductFilters)
    const intl = useIntl()

    const dispatch = useDispatch()

    const filterText = (value: string) => {
        switch (value) {
            case 'latest': return `Sort by latest`
            case 'price-high-low': return `Price-High to Low`
            case 'price-low-high': return `Price-Low to High`
        }
    }

    function hasFilters() {
        return filters?.categories?.length > 0 || filters?.brands?.length > 0 || filters?.sorting !== undefined
    }
    return (
        <div className="px-4">
            {selectedProduct?.length === 0 ? (<div className={'flex my-2 gap-4'}>
                <div className="w-10/12">
                    <input 
                        value={searchValue} 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event?.target.value)} 
                        placeholder={intl.formatMessage({ id: `action.search` })} 
                        className="h-10 w-full rounded bg-slate-100 pl-4 pr-5 outline-none dark:bg-slate-500 dark:text-slate-100 dark:placeholder-slate-200" />
                </div>
                <div onClick={() => {
                    hapticFeedback()
                    onFilterClick()
                }} className={'flex border border-slate-200 rounded place-items-center px-4 py-1 text-slate-400 cursor-pointer text-base font-semibold'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                </div>
            </div>) : (
                <div className={'my-2'}>
                    <ProductCheckedOptions selectedProduct={selectedProduct} setselectedProduct={setselectedProduct} setCounter={setCounter} onMoreClick={onMoreClick} />
                </div>
            )}
            {hasFilters() ? <div className="flex justify-between py-2">
                <div className="flex flex-col">
                    <div className="flex gap-2 items-end">
                        <div className={'text-base font-bold text-slate-500 dark:text-slate-300'}>
                            <FormattedMessage
                                id="global.appliedFilters"
                                defaultMessage="Applied Filters"
                            />
                        </div>
                        {hasFilters() && <div className={'text-sm font-semibold text-blue-500  dark:text-blue-300 cursor-pointer'}
                            onClick={() => {
                                hapticFeedback()
                                dispatch(clearAll())
                            }}>
                            <FormattedMessage
                                id="global.clearAll"
                                defaultMessage="Clear All"
                            />
                        </div>}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {filters?.categories?.map(mapItem => <div key={mapItem.id} className="flex bg-blue-200 font-bold text-xs text-blue-800 px-2 rounded items-center dark:bg-blue-900 dark:text-blue-100 dark:bg-opacity-80 dark:border dark:border-blue-400">{mapItem.name}</div>)}
                        {filters?.brands?.map(mapItem => <div key={mapItem.id} className="flex bg-green-200 font-bold text-xs text-green-800 px-2 rounded items-center dark:bg-green-900 dark:text-green-100 dark:bg-opacity-80 dark:border dark:border-green-400">{mapItem.name}</div>)}
                        {filters?.sorting && (
                            <div className="flex bg-purple-200 font-bold text-xs text-purple-800 px-2 rounded items-center dark:bg-purple-900 dark:text-purple-100 dark:bg-opacity-80 dark:border dark:border-purple-400">
                                {filterText(filters?.sorting)}
                            </div>)}
                    </div>
                </div>
            </div> : null}
        </div>
    )
}