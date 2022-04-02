import React from 'react'
import { FILTERS, FILTERS_VALUES } from './types'

interface IProps {
    setEnableDropDown : (value: React.SetStateAction<boolean>) => void,
    setEnableCustomDate: (value: React.SetStateAction<boolean>) => void,
    setFilter : (value: React.SetStateAction<{
    name: FILTERS;
    value: FILTERS_VALUES;
}>) => void
}

const FilterOptions = ({setEnableDropDown, setFilter, setEnableCustomDate} : IProps) => {
    return (
        <div className="flex flex-col absolute p-2 bg-white dark:bg-slate-700 w-[50vw]">
            <ul className="">
                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                    onClick={() => {
                        setFilter({
                            name : FILTERS.TODAY,
                            value : FILTERS_VALUES.TODAY
                        })
                        setEnableDropDown(false)
                    }}
                > 
                    {FILTERS.TODAY}   
                </li>
                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                    onClick={() => {
                        setFilter({
                            name : FILTERS.YESTERDAY,
                            value : FILTERS_VALUES.YESTERDAY
                        })
                        setEnableDropDown(false)
                    }}
                > 
                    {FILTERS.YESTERDAY}   
                </li>
                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                    onClick={() => {
                        setFilter({
                            name : FILTERS.THIS_MONTH,
                            value : FILTERS_VALUES.THIS_MONTH
                        })
                        setEnableDropDown(false)
                    }}
                > 
                    {FILTERS.THIS_MONTH}   
                </li>
                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                    onClick={() => {
                        setFilter({
                            name : FILTERS.THIS_YEAR,
                            value : FILTERS_VALUES.THIS_YEAR
                        })
                        setEnableDropDown(false)
                    }}
                > 
                    {FILTERS.THIS_YEAR}   
                </li>
                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                    onClick={() => {
                        setFilter({
                            name : FILTERS.LAST_7_DAYS,
                            value : FILTERS_VALUES.LAST_7_DAYS
                        })
                        setEnableDropDown(false)
                    }}
                > 
                    {FILTERS.LAST_7_DAYS}   
                </li>
                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                    onClick={() => {
                        setFilter({
                            name : FILTERS.LAST_30_DAYS,
                            value : FILTERS_VALUES.LAST_30_DAYS
                        })
                        setEnableDropDown(false)
                    }}
                > 
                    {FILTERS.LAST_30_DAYS}   
                </li>
                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                    onClick={() => {
                        setFilter({
                            name : FILTERS.LAST_90_DAYS,
                            value : FILTERS_VALUES.LAST_90_DAYS
                        })
                        setEnableDropDown(false)
                    }}
                > 
                    {FILTERS.LAST_90_DAYS}   
                </li>
                <li className='mb-1 bg-blue-100 px-5 dark:bg-slate-600 p-2'
                    onClick={() => {
                        setEnableDropDown(false)
                        setEnableCustomDate(true)
                    }}
                > 
                    {FILTERS.CUSTOM_DATE}   
                </li>
            </ul>

        </div>
    )
}

export default FilterOptions