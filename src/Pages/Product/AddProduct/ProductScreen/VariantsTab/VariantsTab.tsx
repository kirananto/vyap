import { isNumber } from 'class-validator'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ToggleButton from '../../../../../Components/ToggleButton'
import {
    selectAddProductInfo,
    setMrpPrice,
    setSalesPrice,
    setTaxEnabled
} from '../../redux/addProductSlice'
import type { PAGE_ACTION } from '../types'
import { isValidMRP, isValidSalePrice } from '../validations'


interface Props {
  action?: PAGE_ACTION
  saveAttempt: number
}

function VariantsTab({ action, saveAttempt }: Props) {
    const addProductInfo = useSelector(selectAddProductInfo)

    const dispatch = useDispatch()


    const resetSalesToZero = () => dispatch(setSalesPrice(!isNaN(parseFloat(`${addProductInfo.pricing?.salesPrice ?? 0}`)) ? parseFloat(`${addProductInfo.pricing?.salesPrice ?? 0}`) ?? 0 : 0))

    const resetMRPToZero = () => dispatch(setMrpPrice(!isNaN(parseFloat(`${addProductInfo.pricing?.mrpPrice ?? 0}`)) ? parseFloat(`${addProductInfo.pricing?.mrpPrice ?? 0}`) ?? 0 : 0))

    useEffect(() => {
        if (saveAttempt) {
            resetSalesToZero()
            resetMRPToZero()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveAttempt])

    return (
        <div
            className="flex flex-col gap-5 mt-2 pb-24 overflow-auto"
            style={{ height: 'calc(100vh - 22rem)' }}
        >

            {/* MRP Price */}

            <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300">MRP</p>
                <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch(setMrpPrice(event.target.value as unknown as number))
                    }}
                    onBlur={resetMRPToZero}
                    value={addProductInfo.pricing?.mrpPrice}
                    type=""
                    // min="0"
                    placeholder="Enter price"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                />

                <span
                    className={
                        'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
            (addProductInfo.pricing?.mrpPrice === undefined || isValidMRP(addProductInfo.pricing?.mrpPrice) ? 'hidden' : '')
                    }
                >
          Enter Valid MRP price !
                </span>
            </div>

            {/* Sale Price */}

            <div>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Sales Price</p>
                <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch(setSalesPrice(event.target.value as unknown as number))
                    }}
                    onBlur={resetSalesToZero}
                    value={addProductInfo.pricing?.salesPrice}
                    type="number"
                    min="0"
                    placeholder="Enter price"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                />
                <span
                    className={
                        'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
            (addProductInfo.pricing?.salesPrice === undefined || isValidSalePrice(addProductInfo.pricing?.salesPrice) ? 'hidden' : '')
                    }
                >
          Enter valid Sales price !
                </span>
            </div>


        </div>
    )
}

export default VariantsTab