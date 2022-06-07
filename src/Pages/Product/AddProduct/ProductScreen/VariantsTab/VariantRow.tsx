import { values } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectAddProductInfo,
    setIsSelectedVariant,
    setMrpPrice,
    setSalesPrice,
    setVariantName,
    variantInterface,
} from '../../redux/addProductSlice'
import { isValidDescription, isValidMRP, isValidSalePrice } from '../validations'


interface Props {
    item?: variantInterface
    saveAttempt: number
    index?: number
}


function VariantRow({ item, saveAttempt, index }: Props) {
    const addProductInfo = useSelector(selectAddProductInfo)

    console.log('datavariant', item)

    const dispatch = useDispatch()


    const resetSalesToZero = () => dispatch(setSalesPrice({
        index: index!,
        salesPrice: !isNaN(parseFloat(`${item?.salesPrice ?? 0}`)) ? parseFloat(`${item?.salesPrice ?? 0}`) ?? 0 : 0
    }))

    const resetMRPToZero = () => dispatch(setMrpPrice({
        index: index!,
        mrp: !isNaN(parseFloat(`${item?.mrpPrice ?? 0}`)) ? parseFloat(`${item?.mrpPrice ?? 0}`) ?? 0 : 0
    }))

    function setIsSelected (value: boolean) {
        dispatch(setIsSelectedVariant({ value: value, index: index! }))
    }

    useEffect(() => {
        if (saveAttempt) {
            resetSalesToZero()
            resetMRPToZero()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveAttempt])

    const editMode = false

    return (
        <div className="border dark:border-slate-700  rounded p-4 mt-2">
            <div className="flex" onClick={() => setIsSelected(!item?.isSelected)}>
                <div
                    className={`inline-flex items-center justify-center w-8 h-8 mx-2 p-1 transition duration-500 ease-in-out rounded-full ${item?.isSelected ? 'bg-indigo-200 dark:bg-indigo-700 dark:border dark:border-indigo-500' : 'bg-slate-200 dark:bg-slate-500'}`}>
                    {item?.isSelected && <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-indigo-800 dark:text-indigo-100"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>}
                </div>
                <div className="ml-2">
                    {editMode ? <div> input box </div> : (
                        <div className="font-semibold mt-1 dark:text-slate-400">
                            {item?.name}
                        </div>
                    )}
                </div>
            </div>
            <div className={`mt-4 ${item?.isSelected ? '' : 'hidden'}`}>
                <div
                    className="flex flex-wrap gap-5"
                >
                    {/* Name Price */}

                    <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Name</p>
                        <input
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(setVariantName({
                                    index: index!,
                                    name: event.target.value as unknown as string
                                }))
                            }}
                            onBlur={resetSalesToZero}
                            value={item?.name}
                            type="text"
                            min="0"
                            placeholder="Enter name"
                            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                        />
                        <span
                            className={
                                'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
                                (item?.name === undefined || isValidDescription(item?.name) ? 'hidden' : '')
                            }
                        >
                            Enter valid Name !
                        </span>
                    </div>

                    {/* MRP Price */}

                    <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-300">MRP</p>
                        <input
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(setMrpPrice({
                                    index: index!,
                                    mrp: event.target.value as unknown as number
                                }))
                            }}
                            onBlur={resetMRPToZero}
                            value={item?.mrpPrice}
                            type=""
                            // min="0"
                            placeholder="Enter price"
                            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                        />

                        <span
                            className={
                                'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
                                (item?.mrpPrice === undefined || isValidMRP(item?.mrpPrice) ? 'hidden' : '')
                            }
                        >
                            Enter Valid MRP price !
                        </span>
                    </div>

                    {/* Sale Price */}

                    <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Sale</p>
                        <input
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(setSalesPrice({
                                    index: index!,
                                    salesPrice: event.target.value as unknown as number
                                }))
                            }}
                            onBlur={resetMRPToZero}
                            value={item?.salesPrice}
                            type=""
                            // min="0"
                            placeholder="Enter price"
                            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                        />

                        <span
                            className={
                                'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
                                (item?.salesPrice === undefined || isValidMRP(item?.salesPrice) ? 'hidden' : '')
                            }
                        >
                            Enter Valid Sale price !
                        </span>
                    </div>

                </div>
            </div>
        </div>)
}

export default VariantRow